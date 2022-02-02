import PinManager, {IPinData} from 'api/managers/PinManager';
import {KIND, Notification} from 'baseui/notification';
import PinPage from 'Pages/PinPage';
import SignaturePad from 'Pages/SignaturePad';
import SignaturePage from 'Pages/SignaturePage';
import React, {useEffect, useState} from 'react';
import {Tabs, Tab} from 'baseui/tabs-motion';
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
    const [activeKey, setActiveKey] = useState<React.Key>('pin-entry');
    const [signatureImage, setSignatureImage] = useState<null | string>(null);

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
                    setSignatureImage(signatureImage);
                    setActiveKey('final');
                    // reset();
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

    useEffect(() => {
        if (pinData === null) {
            setActiveKey('pin-entry');
        }
    }, [pinData])

    return (
        <Tabs activeKey={activeKey} onChange={({activeKey}) => setActiveKey(activeKey)}>
            <Tab key="pin-entry" title="Pin Entry">
                <div className="neu-main">
                    <div className="neu-content">
                        <PinPage
                            onError={(error) => {
                                console.log(error);
                                setErrorDetails(error);
                            }}
                            onPinEntered={(pd) => {
                                setPinData(pd);
                                setActiveKey('terms');
                            }}
                            pinValues={pinValues}
                            pinManager={pinManager}
                        />
                    </div>
                </div>
            </Tab>

            <Tab key="terms" title="Terms" disabled={pinData !== null || activeKey !== 'terms'}>
                {pinData !== null &&
                <SignaturePage
                    onCancel={() => reset()}
                    onShowSignatureModal={() => {
                        setIsSignaturePadOpen(true);
                        setActiveKey('signature-pad')
                    }}
                    pinData={pinData}
                />
                }
            </Tab>

            <Tab key="signature-pad" title="Signature Pad" disabled={pinData !== null || activeKey !== 'signature-pad'}>
                <div className="neu-main">
                    <div className="neu-content">
                        <SignaturePad
                            onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
                            show={isSignaturePadOpen}
                        />
                    </div>
                </div>
            </Tab>

            <Tab key="final" title="Final Acceptance" disabled={pinData !== null || activeKey !== 'final'}>
                {pinData !== null && signatureImage !== null &&
                    <SignaturePage
                        onCancel={() => reset()}
                        onShowSignatureModal={() => {
                            setIsSignaturePadOpen(true);
                            setActiveKey('signature-pad')
                        }}
                        pinData={pinData}
                        image={signatureImage}
                    />
                }
            </Tab>

            <Tab key="error" title="Diagnostics" disabled={errorDetails === null}>
                <div className="neu-main">
                    <div className="neu-main">
                        {errorNotification}
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
};

export default LandingPage;
