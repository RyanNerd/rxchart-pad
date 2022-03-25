import PinManager, {IPinData, PinRecord} from 'api/managers/PinManager';
import {KIND, Notification} from 'baseui/notification';
import {Tab, Tabs} from 'baseui/tabs-motion';
import PinPage from 'Pages/PinPage';
import SignaturePage from 'Pages/SignaturePage';
import React, {useState} from 'react';
import 'styles/neumorphism.css';

export enum ACTION_KEY {
    PIN_ENTRY = 'pin-entry',
    TERMS = 'terms'
}

interface IProps {
    PinManager: PinManager;
}

/**
 * Landing Page entry point
 * @link https://html2canvas.hertzen.com/documentation
 * @param {IProps} props Props for this component
 */
const LandingPage = (props: IProps) => {
    const pinManager = props.PinManager;
    const [pinValues, setPinValues] = useState([' ', ' ', ' ', ' ', ' ', ' ']);
    const [pinData, setPinData] = useState<IPinData | null>(null);
    const [errorDetails, setErrorDetails] = useState<null | unknown>(null);
    const [activeKey, setActiveKey] = useState<React.Key | ACTION_KEY>(ACTION_KEY.PIN_ENTRY);

    /**
     * Reset everything and activate the pin entry tab
     */
    const reset = () => {
        pinManager.resetApi();
        setPinValues([' ', ' ', ' ', ' ', ' ', ' ']);
        setPinData(null);
        setActiveKey(ACTION_KEY.PIN_ENTRY);
    };

    const uploadPage = async (pageImage: string) => {
        const pinInfo = {...pinData?.pin_info};
        pinInfo.Image = pageImage;
        pinInfo.PinValue = Math.random().toString(36).slice(2, 5) + Math.random().toString(36).slice(2, 5);
        const pinResponse = await pinManager.update(pinInfo as PinRecord);
        if (pinResponse.success) {
            reset();
        } else {
            console.log('pinResponse', pinResponse);
            setErrorDetails(pinResponse);
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
                        onComplete={async (pageImage) => {
                            if (pageImage) await uploadPage(pageImage);
                        }}
                        pinData={pinData}
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
