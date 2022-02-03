import {IPinData} from 'api/managers/PinManager';
import {Button} from 'baseui/button';
import {ACTION_KEY} from 'Pages/LandingPage';
import React from 'react';

export enum BUTTON_ACTION {
    Sign = 'SIGN',
    Accept = 'ACCEPT',
    Cancel = 'CANCEL'
}

interface IProps {
    activeKey: ACTION_KEY | React.Key;
    onCancel: () => void;
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

    const responseButtons = () => {
        switch (props.activeKey) {
            case ACTION_KEY.SIGNATURE_PAD:
                return (
                    <button
                        className="neu-button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onButtonClick(BUTTON_ACTION.Sign);
                        }}
                    >
                        Click to sign
                    </button>
                );
            case ACTION_KEY.TERMS:
                return <Button>Terms</Button>;
            case ACTION_KEY.FINAL:
                return (
                    <span>
                        Signature: <img src={signatureImage as string} alt="signature" width="300px" height="65px" />
                    </span>
                );
        }
    };

    return (
        <div className="signature">
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
                <span className="mt-3">
                    {responseButtons}

                    {signatureImage ? (
                        <>
                            <span>
                                Signature: <img src={signatureImage} alt="signature" width="300px" height="65px" />
                            </span>
                        </>
                    ) : (
                        <button
                            className="neu-button"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onButtonClick(BUTTON_ACTION.Sign);
                            }}
                        >
                            Click to sign
                        </button>
                    )}
                </span>{' '}
                <span className="ml-3">Date: {today}</span>
                <br />
                <button
                    className="neu-button secondary mt-3"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onButtonClick(BUTTON_ACTION.Cancel);
                    }}
                >
                    Cancel
                </button>
            </p>
        </div>
    );
};

export default SignaturePage;
