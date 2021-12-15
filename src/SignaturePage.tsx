import React from 'react';

interface IProps {
    clientName: string;
    onShowSignatureModal: () => void;
}

/**
 * Signature Page
 * @param {IProps} props The props for this component
 */
const SignaturePage = (props: IProps) => {
    const today = new Date().toLocaleString();
    return (
        <div className="signature">
            <p className="text">
                I, {props.clientName} as a resident of Switchpoint, I declare that I am leaving for the day and verify
                that I have a prescription medication dose that needs to be administered during this time.
                <br />
                I take full responsibility for my medication while I am away from the Switchpoint facility and attest
                that staff gave me my prescription medication for this purpose and this purpose alone.
                <br />
                I am fully aware that if I return to the property and do not immediately turn my prescription
                medications back in to the front office, I can be detained and arrested by the police.
                <br />
                <br />
                <span className="mt-3">
                    Signature:
                    <button
                        className="neu-button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onShowSignatureModal();
                        }}
                    >
                        Click to sign
                    </button>
                </span>{' '}
                <span className="ml-3">Date: {today}</span>
            </p>
        </div>
    );
};

export default SignaturePage;
