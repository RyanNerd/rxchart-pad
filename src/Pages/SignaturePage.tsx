import {IPinData} from 'api/managers/PinManager';
import {DIVIDER, SIZE, Table} from 'baseui/table-semantic';
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

    /**
     * Given a string or Date object return the formatted string of the date: mm/dd/yyyy, hh:mm AM
     * @param {Date | string} date The date to parse and format
     * @returns {string} The date in the format of MM/DD/YYYY HH:MM am/pm
     */
    const getFormattedDate = (date: Date | string): string => {
        const dt = typeof date === 'string' ? new Date(date) : date;
        return dt.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        } as Intl.DateTimeFormatOptions);
    };

    const DrugCheckoutList = () => {
        if (!pinData.med_checkout) return null;

        console.log('med_checkout', pinData.med_checkout);

        const drugCheckoutRows = [];
        for (const r of pinData.med_checkout) {
            drugCheckoutRows.push([r.Drug, getFormattedDate(new Date(r.Updated)), r.Notes, r.Out]);
        }

        return (
            <Table
                columns={['Drug', 'Date / Time', 'Notes', 'Out']}
                data={drugCheckoutRows}
                size={SIZE.compact}
                divider={DIVIDER.grid}
            />
        );
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
                <br />
                <DrugCheckoutList />
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
