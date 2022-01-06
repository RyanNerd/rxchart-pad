import {IPinData, IPinProvider} from "api/providers/pinProvider";
import {SIZE} from 'baseui/input';
import {KIND, Notification} from 'baseui/notification';
import {PinCode} from 'baseui/pin-code';
import React, {useEffect, useState} from 'react';

interface IProps {
    pinValues: string[];
    onPinEntered: (pinInfo: IPinData) => void;
    pinManager: IPinProvider;
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

    const pinManager = props.pinManager;
    const onPinEntered = props.onPinEntered;

    const [searchPinValue, setSearchPinValue] = useState('')
    const searchPin = async (pin: string[]) => {
        const pinData = await pinManager.authenticate(pin.join(''));
        if (pinData !== null) {
            setSearchPinValue(pinData.pin_info.PinValue)
            onPinEntered(pinData);
        } else {
            setSearchPinValue('');
        }
    }

    useEffect(() => {
        if (!pinValues.includes(' ')) {
            searchPin(pinValues);
        }
    })

    /**
     * Fires when the user clicks the Reset button
     */
    const reset = () => {
        setPinValues([' ', ' ', ' ', ' ', ' ', ' ']);
        const pinEntry = document.getElementById('pin-entry-0');
        if (pinEntry) {
            pinEntry.focus();
        }
    };

    return (
        <div className="pin">
            <div className="neu-field text px-4">Enter the 6-digit PIN</div>

            <div>
                <PinCode
                    id="pin-entry"
                    autoFocus
                    onChange={({values}) => setPinValues(values)}
                    values={pinValues}
                    size={SIZE.large}
                />
                {!pinValues.includes(' ') && pinValues.join('') !== searchPinValue && (
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
