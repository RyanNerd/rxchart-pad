import {SIZE} from "baseui/input";
import {PinCode} from "baseui/pin-code";
import React, {useState} from "react";

interface IProps {
    defaultPinValues: string[];
    onChange: (pin: string[]) => void;
}

const PinPage = (props: IProps) => {
    const [values, setValues] = useState(props.defaultPinValues);

   const reset = () => {
        setValues(props.defaultPinValues);
        const pinEntry = document.getElementById('pin-entry-0');
        if (pinEntry) {
            pinEntry.focus();
        }
    }

    const handleOnChange = (pinValues: string[]) => {
        setValues(pinValues);
        props.onChange(pinValues);
    }

    return (
        <div className="pin">
            <div className="neu-field text">
                Enter the 5-digit PIN
            </div>
            <div className='is-invalid'>
                <PinCode
                    id="pin-entry"
                    autoFocus
                    onChange={({values}) => handleOnChange(values)}
                    values={values}
                    size={SIZE.large}
                />
                <div className="invalid-feedback">First name can not be blank.</div>
            </div>

            <div>
                <button
                    onClick={() => reset()}
                    className="neu-button"
                    style={{marginTop: "1.5rem"}}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default PinPage;
