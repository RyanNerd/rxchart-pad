import PinManager, {IPinData} from 'api/managers/PinManager';
import {KIND, Notification} from 'baseui/notification';
import {Tab, Tabs} from 'baseui/tabs-motion';
import PinPage from 'Pages/PinPage';
import SignaturePad from 'Pages/SignaturePad';
import SignaturePage, {BUTTON_ACTION} from 'Pages/SignaturePage';
import React, {useEffect, useState} from 'react';
import 'styles/neumorphism.css';

export enum ACTION_KEY {
    FINAL = 'final',
    PIN_ENTRY = 'pin-entry',
    SIGNATURE_PAD = 'signature-pad',
    TERMS = 'terms'
}

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
    const [activeKey, setActiveKey] = useState<React.Key | ACTION_KEY>(ACTION_KEY.PIN_ENTRY);
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
                    setActiveKey(ACTION_KEY.FINAL);
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
            setActiveKey(ACTION_KEY.PIN_ENTRY);
        }
    }, [pinData]);

    return (
        <Tabs activeKey={activeKey} onChange={({activeKey}) => setActiveKey(activeKey)}>
            <Tab key={ACTION_KEY.PIN_ENTRY} title="Pin Entry" disabled={activeKey !== ACTION_KEY.PIN_ENTRY}>
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

            <Tab key={ACTION_KEY.TERMS} title="Terms" disabled={pinData !== null || activeKey !== ACTION_KEY.TERMS}>
                {pinData !== null && (
                    <SignaturePage
                        activeKey={activeKey}
                        onCancel={() => reset()}
                        onButtonClick={(action) => {
                            if (action === BUTTON_ACTION.Sign) {
                                setIsSignaturePadOpen(true);
                                setActiveKey('signature-pad');
                            }
                        }}
                        pinData={pinData}
                    />
                )}
            </Tab>

            <Tab
                key={ACTION_KEY.SIGNATURE_PAD}
                title="Signature Pad"
                disabled={pinData !== null || activeKey !== ACTION_KEY.SIGNATURE_PAD}
            >
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
                {pinData !== null && signatureImage !== null && (
                    <SignaturePage
                        activeKey={activeKey}
                        onCancel={() => reset()}
                        onButtonClick={(action) => {
                            if (action === BUTTON_ACTION.Accept) {
                                setIsSignaturePadOpen(true);
                                setActiveKey('signature-pad');
                            }
                        }}
                        pinData={pinData}
                        image={signatureImage}
                    />
                )}
            </Tab>

            <Tab key="error" title="Diagnostics" disabled={errorDetails === null}>
                <div className="neu-main">
                    <div className="neu-main">{errorNotification}</div>
                </div>
            </Tab>
        </Tabs>
    );
};

export default LandingPage;
