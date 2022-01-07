import PinManager, {IPinData} from "api/managers/PinManager";
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

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleSignatureModalClose = (signature: string | null) => {
        const saveSignature = async (signatureImage: string) => {
            alert('Signature Image Len: ' + signatureImage.length);
            if (pinData) {
                const pinInfo = {...pinData.pin_info};
                pinInfo.Image = signatureImage;
                const pinResponse = await pinManager.update(pinInfo);
                if (pinResponse.success) {
                    setIsSignaturePadOpen(false);
                    setPinValues([...defaultPinValues]);
                    setPinData(null);
                } else {
                    // todo: display actual soft error or log it or do something when failure occurs
                    console.log('pinResponse', pinResponse);
                    alert('Soft Error: ' + JSON.stringify(pinResponse));
                }
            }
        }

        if (signature) saveSignature(signature)
    };

    return (
        <>
            <div className="neu-main">
                <div className="neu-content">
                    {pinData === null ? (
                        <PinPage
                            onPinEntered={(pd) => setPinData(pd)}
                            pinValues={pinValues}
                            pinManager={pinManager}
                        />
                    ) : (
                        <SignaturePage
                            pinData={pinData}
                            onShowSignatureModal={() => setIsSignaturePadOpen(true)}
                        />
                    )}
                </div>
            </div>

            <SignaturePad
                show={isSignaturePadOpen}
                onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
            />
        </>
    );
};

export default LandingPage;
