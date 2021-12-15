import {KIND} from "baseui/button";
import {SIZE} from "baseui/input";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE} from "baseui/modal";
import React, {useState} from 'react';
import SignaturePage from "./SignaturePage";
import PinPage from "./PinPage";
import './styles/neumorphism.css';

function App() {
    const defaultPinValues = [" ", " ", " ", " ", " "];
    const [pinValues, setPinValues] = useState(defaultPinValues);
    const [isOpen, setIsOpen] = useState(false);
    const clientName = 'Arthur Frankel';

    const handleModalClose = (signature: string | null) => {
      if (signature) alert('todo: handle signature - ' + signature);
      setIsOpen(false);
      window.location.reload();
    }

    return (
        <>
        <div className="neu-main">
            <div className="neu-content">
                {pinValues.includes(' ') || pinValues.join('') !== '12345' ?
                    (
                        <PinPage
                            onChange={(values) => setPinValues(values)}
                            defaultPinValues={defaultPinValues}
                        />
                    ) : (
                        <SignaturePage
                            clientName={clientName}
                            onShowSignatureModal={() => setIsOpen(true)}
                        />
                    )}
            </div>
        </div>


            <Modal
                onClose={() => handleModalClose(null)}
                closeable
                isOpen={isOpen}
                animate
                autoFocus
                size={SIZE.default}
                role={ROLE.dialog}
                unstable_ModalBackdropScroll={true}
            >
                <ModalHeader>Hello world</ModalHeader>
                <ModalBody>
                    Proin ut dui sed metus pharetra hend rerit vel non
                    mi. Nulla ornare faucibus ex, non facilisis nisl.
                    Maecenas aliquet mauris ut tempus.
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind={KIND.secondary} onClick={() => handleModalClose(null)}>
                        Reset
                    </ModalButton>
                    <ModalButton kind={KIND.primary} onClick={() => handleModalClose('my signature')}>
                        Accept
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </>

)}

export default App;
