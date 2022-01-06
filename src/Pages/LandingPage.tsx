import pinProvider, {IPinData} from 'api/providers/pinProvider';
import React, {useState} from 'react';
import SignaturePad from 'Pages/SignaturePad';
import PinPage from 'Pages/PinPage';
import SignaturePage from 'Pages/SignaturePage';
import 'styles/neumorphism.css';

interface IProps {
    baseUrl: string;
}
/**
 * Landing Page entry point
 * @param {IProps} props The props for this component
 */
const LandingPage = (props: IProps) => {
    const pinManager = pinProvider(props.baseUrl);
    const defaultPinValues = [' ', ' ', ' ', ' ', ' ', ' '] as Readonly<string[]>;
    const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
    const [pinValues, setPinValues] = useState([...defaultPinValues]);
    const [pinData, setPinData] = useState<IPinData | null>(null);

    /**
     * This fires when the user closes the signature modal
     * @param {boolean} signature True if user accepted the signature, false otherwise.
     */
    const handleSignatureModalClose = (signature: string | null) => {
        if (signature) alert('todo: handle signature - ' + JSON.stringify(signature));
        setIsSignaturePadOpen(false);
        setPinValues([...defaultPinValues]);
        setPinData(null);
    };

    return (
        <>
            <div className="neu-main">
                <div className="neu-content">
                    {pinData === null ? (
                        <PinPage
                            onPinEntered={(pd) => setPinData(pd)}
                            pinValues={pinValues}
                            pinManager={pinManager}
                        />
                    ) : (
                        <SignaturePage
                            pinData={pinData}
                            onShowSignatureModal={() => setIsSignaturePadOpen(true)}
                        />
                    )}
                </div>
            </div>

            <SignaturePad
                show={isSignaturePadOpen}
                onClose={(imgPngString) => handleSignatureModalClose(imgPngString)}
            />
        </>
    );
};

export default LandingPage;
