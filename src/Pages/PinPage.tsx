import PinManager, {IPinData} from 'api/managers/PinManager';
import {SIZE} from 'baseui/input';
import {KIND, Notification} from 'baseui/notification';
import {PinCode} from 'baseui/pin-code';
import React, {useEffect, useState} from 'react';

interface IProps {
    onError: (error: unknown) => void;
    onPinEntered: (pinInfo: IPinData) => void;
    pinManager: PinManager;
    pinValues: string[];
}

/**
 * PIN Entry Page
 * @param {IProps} props The props for this component
 */
const PinPage = (props: IProps) => {
    /**
     * Pin-code component lacks a ref prop so we need to use old-fashioned JS and DOM manipulation with a timeout kludge
     */
    const focusFirstPin = () => {
        const pinEntry = document.getElementById('pin-entry-0');
        setTimeout(() => {
            pinEntry?.focus();
        }, 500);
    };

    const [pinValues, setPinValues] = useState(props.pinValues);
    useEffect(() => {
        setPinValues(props.pinValues);
        focusFirstPin();
    }, [props.pinValues]);

    const pinManager = props.pinManager;
    const onPinEntered = props.onPinEntered;
    const onError = props.onError;
    const [searchPinValue, setSearchPinValue] = useState('');

    /**
     * Call the API to authenticate the PIN value
     * @param {string[]} pin The array of PIN values
     * @returns {Promise<void>}
     */
    const searchPin = async (pin: string[]) => {
        try {
            const pinData = await pinManager.authenticate(pin.join(''));
            if (pinData !== null) {
                setSearchPinValue(pinData.pin_info.PinValue);
                onPinEntered(pinData);
            } else {
                setSearchPinValue('');
            }
        } catch (error: unknown) {
            onError(error);
        }
    };

    // Kick off a search when pin values are all filled with values
    useEffect(() => {
        if (!pinValues.includes(' ')) searchPin(pinValues);
    });

    /**
     * Fires when the user clicks the Reset button
     */
    const reset = () => {
        setPinValues([' ', ' ', ' ', ' ', ' ', ' ']);
        focusFirstPin();
    };

    return (
        <div className="pin">
            <div className="neu-field text px-4">Enter the 6-digit PIN</div>

            <div>
                <PinCode
                    autoFocus={true}
                    id="pin-entry"
                    onChange={({values}) => setPinValues(values)}
                    required={true}
                    size={SIZE.large}
                    values={pinValues}
                />
                {!pinValues.includes(' ') && pinValues.join('') !== searchPinValue && (
                    <>
                        <Notification kind={KIND.warning}>PIN is invalid. Reset and try again.</Notification>

                        <button
                            className="neu-button mt-3"
                            id="reset-pin"
                            onClick={(e) => {
                                e.preventDefault();
                                reset();
                            }}
                        >
                            Reset
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PinPage;
