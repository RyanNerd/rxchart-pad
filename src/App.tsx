import LoginModal from 'LoginModal';
import React, {useState} from 'react';
import SignaturePad from 'SignaturePad';
import PinPage from './PinPage';
import SignaturePage from './SignaturePage';
import './styles/neumorphism.css';

/**
 * App entry point
 */
const App = () => {
    const clientName = 'Arthur Frankel';
    const defaultPinValues = [' ', ' ', ' ', ' ', ' '];
    const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
    const [pinValues, setPinValues] = useState(defaultPinValues);
    const [apiKey, setApiKey] = useState('');

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleSignatureModalClose = (signature: string | null) => {
        if (signature) alert('todo: handle signature - ' + JSON.stringify(signature));
        setIsSignaturePadOpen(false);
        setPinValues(defaultPinValues);
    };

    return (
        <>
            <div className="neu-main">
                <div className="neu-content">
                    {pinValues.includes(' ') || pinValues.join('') !== '12345' ? (
                        <PinPage onChange={(values) => setPinValues(values)} defaultPinValues={defaultPinValues} />
                    ) : (
                        <SignaturePage
                            clientName={clientName}
                            onShowSignatureModal={() => setIsSignaturePadOpen(true)}
                        />
                    )}
                </div>
            </div>

            <SignaturePad
                show={isSignaturePadOpen}
                onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
            />

            <LoginModal
                onClose={(apiKey) => setApiKey(apiKey || '')}
                show={apiKey === ''}
            />
        </>
    );
};

export default App;
