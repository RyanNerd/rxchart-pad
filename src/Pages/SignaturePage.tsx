import {IPinData} from 'api/managers/PinManager';
import {DIVIDER, SIZE, Table} from 'baseui/table-semantic';
import html2canvas from 'html2canvas';
import SignaturePad from 'Pages/SignaturePad';
import React, {useEffect, useState} from 'react';

interface IProps {
    onComplete: (pageImage: string | null) => void;
    pinData: IPinData;
    image?: string;
}

/**
 * Signature Page
 * @param {IProps} props The props for this component
 */
const SignaturePage = (props: IProps) => {
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [signatureImage, setSignatureImage] = useState<null | string>(null);
    const today = new Date().toLocaleString();
    const pinData = props.pinData;
    const clientName = pinData.client_info.first_name.trim() + ' ' + pinData.client_info.last_name.trim();
    const organization = pinData.organization.trim();
    const onComplete = props.onComplete;

    useEffect(() => {
        const completeSignature = async () => {
            const finalElement = document.getElementById('final');
            if (finalElement) {
                const canvas = await html2canvas(finalElement);
                onComplete(canvas.toDataURL('image/png'));
            }
        };

        if (signatureImage) completeSignature();
    });

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
        <>
            <div className="neu-content" id="final">
                <p className="text">
                    I, {clientName} as a resident of {organization}, I declare that I am leaving for the day and verify
                    that I have a prescription medication dose that needs to be administered during this time.
                    <br />I take full responsibility for my medication while I am away from the {organization} facility
                    and attest that staff gave me my prescription medication for this purpose and this purpose alone.
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
                    {signatureImage === null && (
                        <>
                            <button
                                className="neu-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowSignaturePad(true);
                                }}
                            >
                                Click to sign
                            </button>

                            <button
                                className="neu-button secondary mt-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onComplete(null);
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </p>
            </div>

            <SignaturePad
                show={showSignaturePad}
                onClose={async (signatureImage) => {
                    setShowSignaturePad(false);
                    setSignatureImage(signatureImage);
                }}
            />
        </>
    );
};

export default SignaturePage;
