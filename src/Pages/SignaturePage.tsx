import {IPinData} from 'api/managers/PinManager';
import {ACTION_KEY} from 'Pages/LandingPage';
import React, {useEffect, useState} from 'react';

export enum BUTTON_ACTION {
    Sign = 'SIGN',
    Accept = 'ACCEPT',
    Resign = 'RESIGN',
    Cancel = 'CANCEL'
}

interface IProps {
    activeKey: ACTION_KEY | React.Key;
    onButtonClick: (buttonAction: BUTTON_ACTION) => void;
    pinData: IPinData;
    image?: string;
}

/**
 * Signature Page
 * @param {IProps} props The props for this component
 */
const SignaturePage = (props: IProps) => {
    const today = new Date().toLocaleString();
    const pinData = props.pinData;
    const clientName = pinData.client_info.first_name.trim() + ' ' + pinData.client_info.last_name.trim();
    const organization = pinData.organization.trim();
    const signatureImage = props.image || null;
    const onButtonClick = props.onButtonClick;

    const [activeKey, setActiveKey] = useState(props.activeKey);
    useEffect(() => setActiveKey(props.activeKey), [props.activeKey]);

    /**
     * Depending on the ACTION_KEY determine what buttons to render
     */
    const ResponseButtons = () => {
        switch (activeKey) {
            case ACTION_KEY.TERMS:
                return (
                    <button
                        className="neu-button"
                        onClick={(e) => {
                            e.preventDefault();
                            onButtonClick(BUTTON_ACTION.Sign);
                        }}
                    >
                        Click to sign
                    </button>
                );
            case ACTION_KEY.FINAL:
                return (
                    <>
                        <button
                            className="neu-button"
                            onClick={(e) => {
                                e.preventDefault();
                                onButtonClick(BUTTON_ACTION.Accept);
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="neu-button ml-3"
                            onClick={(e) => {
                                e.preventDefault();
                                onButtonClick(BUTTON_ACTION.Resign);
                            }}
                        >
                            Redo signature
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="neu-content">
            <p className="text">
                I, {clientName} as a resident of {organization}, I declare that I am leaving for the day and verify that
                I have a prescription medication dose that needs to be administered during this time.
                <br />I take full responsibility for my medication while I am away from the {organization} facility and
                attest that staff gave me my prescription medication for this purpose and this purpose alone.
                <br />
                I am fully aware that if I return to the property and do not immediately turn my prescription
                medications back in to the front office, I can be detained and arrested by the police.
                <br />
                <br />
                {signatureImage && (
                    <>
                        <span className="mt-3">
                            Signature: <img src={signatureImage} alt="signature" width="300px" height="65px" />
                        </span>{' '}
                        <span className="ml-3">Date: {today}</span>
                    </>
                )}
                <br />
                <ResponseButtons />
                <button
                    className="neu-button secondary mt-3"
                    onClick={(e) => {
                        e.preventDefault();
                        onButtonClick(BUTTON_ACTION.Cancel);
                    }}
                >
                    Cancel
                </button>
            </p>
        </div>
    );
};

export default SignaturePage;
