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
    const [isOpen, setIsOpen] = useState(false);
    const [pinValues, setPinValues] = useState(defaultPinValues);

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleModalClose = (signature: string | null) => {
        if (signature) alert('todo: handle signature - ' + JSON.stringify(signature));
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <>
            <div className="neu-main">
                <div className="neu-content">
                    {pinValues.includes(' ') || pinValues.join('') !== '12345' ? (
                        <PinPage onChange={(values) => setPinValues(values)} defaultPinValues={defaultPinValues} />
                    ) : (
                        <SignaturePage clientName={clientName} onShowSignatureModal={() => setIsOpen(true)} />
                    )}
                </div>
            </div>

            <SignaturePad show={isOpen} onClose={(imgPngString) => handleModalClose(imgPngString)} />
        </>
    );
};

export default App;
