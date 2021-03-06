import {KIND} from 'baseui/button';
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE} from 'baseui/modal';
import React, {useEffect, useRef, useState} from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas';

interface IProps {
    show: boolean;
    onClose: (imgPngString: string) => void;
}

/**
 * Signature Pad modal
 * @param {IProps} props The props for this component
 */
const SignaturePad = (props: IProps) => {
    const onClose = props.onClose;
    const [showSignaturePad, setShowSignaturePad] = useState(props.show);
    useEffect(() => {
        setShowSignaturePad(props.show);
    }, [props.show]);

    const signatureReference = useRef<ReactSignatureCanvas>(null);
    const [canAccept, setCanAccept] = useState(false);

    /**
     * Fires when the user clicks the accept button
     */
    const handleOnAccept = () => {
        if (signatureReference.current) {
            const imgData = signatureReference.current.toDataURL('image/png');
            onClose(imgData);
        }
    };

    return (
        <Modal
            animate
            autoFocus
            closeable={false}
            isOpen={showSignaturePad}
            role={ROLE.dialog}
            size={SIZE.auto}
            unstable_ModalBackdropScroll={true}
        >
            <ModalHeader>
                <span style={{userSelect: 'none'}}>Using the mouse or touchpad sign below</span>
            </ModalHeader>
            <ModalBody>
                <SignatureCanvas
                    backgroundColor="#5E687949"
                    canvasProps={{width: 800, height: 350, className: 'signature-canvas'}}
                    penColor="green"
                    ref={signatureReference}
                    onBegin={() => setCanAccept(true)}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    kind={KIND.secondary}
                    onClick={() => {
                        signatureReference?.current?.clear();
                        setCanAccept(false);
                    }}
                >
                    Clear
                </ModalButton>
                <ModalButton kind={KIND.primary} onClick={() => handleOnAccept()} disabled={!canAccept}>
                    Accept
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
};

export default SignaturePad;
