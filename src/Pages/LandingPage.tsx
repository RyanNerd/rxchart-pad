import PinManager, {IPinData} from 'api/managers/PinManager';
import {KIND, Notification} from 'baseui/notification';
import PinPage from 'Pages/PinPage';
import SignaturePad from 'Pages/SignaturePad';
import SignaturePage from 'Pages/SignaturePage';
import React, {useState} from 'react';
import 'styles/neumorphism.css';

interface IProps {
    PinManager: PinManager;
}

/**
 * Landing Page entry point
 * @param {IProps} props Props for this component
 */
const LandingPage = (props: IProps) => {
    const pinManager = props.PinManager;
    const defaultPinValues = [' ', ' ', ' ', ' ', ' ', ' '] as Readonly<string[]>;
    const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
    const [pinValues, setPinValues] = useState([...defaultPinValues]);
    const [pinData, setPinData] = useState<IPinData | null>(null);
    const [errorDetails, setErrorDetails] = useState<null | unknown>(null);

    const reset = () => {
        pinManager.resetApi();
        setPinValues([...defaultPinValues]);
        setPinData(null);
    };

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleSignatureModalClose = (signature: string) => {
        const saveSignature = async (signatureImage: string) => {
            if (pinData) {
                const pinInfo = {...pinData.pin_info};
                pinInfo.Image = signatureImage;
                const pinResponse = await pinManager.update(pinInfo);

                if (pinResponse.success) {
                    reset();
                } else {
                    console.log('pinResponse', pinResponse);
                    setErrorDetails(pinResponse);
                }
            }
        };

        setIsSignaturePadOpen(false);
        saveSignature(signature);
    };

    const errorNotification = (
        <Notification kind={KIND.warning}>
            An error has occurred. Check the internet connection or console log
        </Notification>
    );

    const normal = (
        <>
            {pinData === null ? (
                <PinPage
                    onError={(error) => {
                        console.log(error);
                        setErrorDetails(error);
                    }}
                    onPinEntered={(pd) => setPinData(pd)}
                    pinValues={pinValues}
                    pinManager={pinManager}
                />
            ) : (
                <SignaturePage
                    onCancel={() => reset()}
                    onShowSignatureModal={() => setIsSignaturePadOpen(true)}
                    pinData={pinData}
                />
            )}
        </>
    );

    return (
        <>
            <div className="neu-main">
                <div className="neu-content">{errorDetails === null ? normal : errorNotification}</div>
            </div>

            <SignaturePad
                onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
                show={isSignaturePadOpen}
            />
        </>
    );
};

export default LandingPage;
