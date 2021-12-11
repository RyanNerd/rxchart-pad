import {SIZE} from "baseui/input";
import {PinCode} from "baseui/pin-code";
import React, {useState} from "react";
import {Row} from "react-bootstrap";

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
            <Row className="neu-field text">
                Enter the 5-digit PIN
            </Row>
            <Row className='is-invalid'>
                <PinCode
                    id="pin-entry"
                    autoFocus
                    onChange={({values}) => handleOnChange(values)}
                    values={values}
                    size={SIZE.large}
                />
                <div className="invalid-feedback">First name can not be blank.</div>
            </Row>

            <Row>
                <button onClick={() => reset()} className="mt-4 neu-button">Reset</button>
            </Row>
        </div>
    )
}

export default PinPage;
