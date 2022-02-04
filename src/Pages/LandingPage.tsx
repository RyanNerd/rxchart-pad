import PinManager, {IPinData} from 'api/managers/PinManager';
import {KIND, Notification} from 'baseui/notification';
import {Tab, Tabs} from 'baseui/tabs-motion';
import PinPage from 'Pages/PinPage';
import SignaturePad from 'Pages/SignaturePad';
import SignaturePage, {BUTTON_ACTION} from 'Pages/SignaturePage';
import React, {useState} from 'react';
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

    /**
     * Reset everything and activate the pin entry tab
     */
    const reset = () => {
        pinManager.resetApi();
        setPinValues([...defaultPinValues]);
        setPinData(null);
        setActiveKey(ACTION_KEY.PIN_ENTRY);
    };

    /**
     * Save the signature as accepted and scramble the pin value
     * @param {string} signatureImage The PNG data image string
     */
    const saveSignature = async (signatureImage: string) => {
        if (pinData) {
            const pinInfo = {...pinData.pin_info};
            pinInfo.Image = signatureImage;
            pinInfo.PinValue = Math.random().toString(36).slice(2, 5) + Math.random().toString(36).slice(2, 5);
            const pinResponse = await pinManager.update(pinInfo);

            if (pinResponse.success) {
                setSignatureImage(signatureImage);
            } else {
                console.log('pinResponse', pinResponse);
                setErrorDetails(pinResponse);
            }
        }
    };

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
                        onButtonClick={(action) => {
                            if (action === BUTTON_ACTION.Sign) {
                                setIsSignaturePadOpen(true);
                                setActiveKey(ACTION_KEY.SIGNATURE_PAD);
                            }

                            if (action === BUTTON_ACTION.Cancel) {
                                reset();
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
                            onClose={(imgPngString) => {
                                setIsSignaturePadOpen(false);
                                setSignatureImage(imgPngString);
                                setActiveKey(ACTION_KEY.FINAL);
                            }}
                            show={isSignaturePadOpen}
                        />
                    </div>
                </div>
            </Tab>

            <Tab key="final" title="Final Acceptance" disabled={pinData !== null || activeKey !== 'final'}>
                {pinData !== null && signatureImage !== null && (
                    <SignaturePage
                        activeKey={activeKey}
                        onButtonClick={(action) => {
                            switch (action) {
                                case BUTTON_ACTION.Resign:
                                    setIsSignaturePadOpen(true);
                                    setActiveKey(ACTION_KEY.SIGNATURE_PAD);
                                    break;

                                case BUTTON_ACTION.Accept:
                                    saveSignature(signatureImage);
                                    reset();
                                    break;

                                case BUTTON_ACTION.Cancel:
                                    reset();
                                    break;
                            }
                        }}
                        pinData={pinData}
                        image={signatureImage}
                    />
                )}
            </Tab>

            <Tab key="error" title="Diagnostics" disabled={errorDetails === null}>
                <div className="neu-main">
                    <div className="neu-main">
                        <Notification kind={KIND.warning}>
                            An error has occurred. Check the internet connection and console log
                        </Notification>
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
};

export default LandingPage;
