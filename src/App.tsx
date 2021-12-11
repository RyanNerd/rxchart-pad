import {SIZE} from "baseui/input";
import {PinCode} from "baseui/pin-code";
import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import './styles/neumorphism.css';

function App() {
    const defaultPinValues = [" ", " ", " ", " ", " "];
    const [values, setValues] = useState(defaultPinValues);

    const reset = () => {
        setValues(defaultPinValues);
        const pinEntry = document.getElementById('pin-entry-0');
        if (pinEntry) {
            pinEntry.focus();
        }
    }

    const clientName = 'Arthur Frankel';
    const today = new Date().toLocaleString();

    return (
        <Form className="neu-main">
            <div className="neu-content">
                {values.includes(' ') || values.join('') !== '12345' ?
                    (
                        <div className="pin">
                            <Row className="neu-field text">
                                Enter the 5-digit PIN
                            </Row>
                            <Row className='is-invalid'>
                                <PinCode
                                    id="pin-entry"
                                    autoFocus
                                    onChange={({values}) => setValues(values)}
                                    values={values}
                                    size={SIZE.large}
                                />
                                <div className="invalid-feedback">First name can not be blank.</div>
                            </Row>

                            <Row>
                                <button onClick={() => reset()} className="mt-4 neu-button">Reset</button>
                            </Row>
                        </div>
                    ) : (
                        <Row className="signature">
                            <p className="text">
                                I, {clientName} as a resident of Switchpoint, I declare that I am leaving for the day
                                and
                                verify that I
                                have a prescription medication dose that needs to be administered during this time.
                                <br/>
                                I take full responsibility for my medication while I am away from the Switchpoint
                                facility and
                                attest that staff gave me my prescription medication for this purpose and this purpose
                                alone.
                                <br/>
                                I am fully aware that if I return to the property and do not immediately turn my
                                prescription
                                medications back in to the front office, I can be detained and arrested by the police.
                                <br/>
                                <br/>
                                <span className="mt-3">
                                    Signature:
                                    <button className="neu-button" onClick={() => alert('todo: show sig pad')}>
                                        Click to sign
                                    </button>
                                </span>{' '}
                                <span className="ml-3">Date: {today}</span>
                            </p>
                        </Row>
                    )}
            </div>
        </Form>
    );
}

export default App;
