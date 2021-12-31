import {SIZE} from 'baseui/input';
import {KIND, Notification} from 'baseui/notification';
import {PinCode} from 'baseui/pin-code';
import React, {useEffect, useState} from 'react';

interface IProps {
    pinValues: string[];
    onPinEntered: (pin: string[]) => void;
}

/**
 * PIN Page
 * @param {IProps} props The props for this component
 */
const PinPage = (props: IProps) => {
    const [pinValues, setPinValues] = useState(props.pinValues);
    useEffect(() => {
        setPinValues(props.pinValues);
    },[props.pinValues])

    /**
     * Fires when the user clicks the Reset button
     */
    const reset = () => {
        setPinValues([' ', ' ', ' ', ' ', ' ']);
        const pinEntry = document.getElementById('pin-entry-0');
        if (pinEntry) {
            pinEntry.focus();
        }
    };

    /**
     * Fires when the user enters a PIN value
     * @param {string[]} pinValues The string of pin values as an array
     */
    const handleOnChange = (pinValues: string[]) => {
        setPinValues(pinValues);
        if (!pinValues.includes(' ')) {
            if (pinValues.join('') === '12345') {
                props.onPinEntered(pinValues);
            }
        }
    };

    return (
        <div className="pin">
            <div className="neu-field text px-4">Enter the 5-digit PIN</div>

            <div>
                <PinCode
                    id="pin-entry"
                    autoFocus
                    onChange={({values}) => handleOnChange(values)}
                    values={pinValues}
                    size={SIZE.large}
                />
                {!pinValues.includes(' ') && pinValues.join('') !== '12345' && (
                    <>
                        <Notification kind={KIND.warning}>PIN is invalid. Reset and try again.</Notification>

                        <button
                            id="reset-pin"
                            onClick={(e) => {
                                e.preventDefault();
                                reset();
                            }}
                            className="neu-button mt-3"
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
