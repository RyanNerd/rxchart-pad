import {SIZE} from "baseui/input";
import {KIND, Notification} from "baseui/notification"
import {PinCode} from "baseui/pin-code";
import React, {useEffect, useRef, useState} from "react";

interface IProps {
    defaultPinValues: string[];
    onChange: (pin: string[]) => void;
}

const PinPage = (props: IProps) => {
    const [pinValues, setPinValues] = useState(props.defaultPinValues);
    const resetRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if ((!pinValues.includes(' ') && pinValues.join('') !== '12345')) {
            resetRef?.current?.focus();
        }
    })

   const reset = () => {
        setPinValues(props.defaultPinValues);
        const pinEntry = document.getElementById('pin-entry-0');
        if (pinEntry) {
            pinEntry.focus();
        }
    }

    const handleOnChange = (pinValues: string[]) => {
        setPinValues(pinValues);
        props.onChange(pinValues);
    }


    return (
        <div className="pin">
            <div className="neu-field text px-4">
                Enter the 5-digit PIN
            </div>

            <div>
                <PinCode
                    id="pin-entry"
                    autoFocus
                    onChange={({values}) => handleOnChange(values)}
                    values={pinValues}
                    size={SIZE.large}
                />
                {(!pinValues.includes(' ') && pinValues.join('') !== '12345') &&
                    <>
                    <Notification kind={KIND.warning}>
                        PIN is invalid. Reset and try again.
                    </Notification>

                    <button
                        id="reset-pin"
                        onClick={(e) => {
                            e.preventDefault();
                            reset();
                        }}
                        ref={resetRef}
                        className="neu-button mt-3"
                    >
                        Reset
                    </button>
                    </>
                }
            </div>
        </div>
    )
}

export default PinPage;
