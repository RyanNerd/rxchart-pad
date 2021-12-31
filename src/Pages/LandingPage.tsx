import LoginModal from 'Pages/LoginModal';
import {IAuthManager} from "managers/authManager";
import React, {useState} from 'react';
import SignaturePad from 'Pages/SignaturePad';
import PinPage from 'Pages/PinPage';
import SignaturePage from 'Pages/SignaturePage';
import 'styles/neumorphism.css';

interface IProps {
    authenticationManager: IAuthManager;
}
/**
 * Landing Page entry point
 * @param {IProps} props The props for this component
 */
const LandingPage = (props: IProps) => {
    const am = props.authenticationManager;
    const clientName = 'Arthur Frankel';
    const defaultPinValues = [' ', ' ', ' ', ' ', ' '] as Readonly<string[]>;
    const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
    const [pinValues, setPinValues] = useState([...defaultPinValues]);
    const [apiKey, setApiKey] = useState('');

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleSignatureModalClose = (signature: string | null) => {
        if (signature) alert('todo: handle signature - ' + JSON.stringify(signature));
        setIsSignaturePadOpen(false);
        setPinValues([...defaultPinValues]);
    };

    return (
        <>
            <div className="neu-main">
                {apiKey &&
                    <div className="neu-content">
                        {pinValues.includes(' ') ? (
                            <PinPage onPinEntered={(values) => setPinValues(values)} pinValues={pinValues}/>
                        ) : (
                            <SignaturePage
                                clientName={clientName}
                                onShowSignatureModal={() => setIsSignaturePadOpen(true)}
                            />
                        )}
                    </div>
                }
            </div>

            <SignaturePad
                show={isSignaturePadOpen}
                onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
            />

            <LoginModal authenticationManager={am} onClose={(apiKey) => setApiKey(apiKey || '')} show={apiKey === ''} />
        </>
    );
};

export default LandingPage;
