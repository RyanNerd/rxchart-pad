import {KIND} from 'baseui/button';
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE} from 'baseui/modal';
import React, {useEffect, useState} from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface IProps {
    show: boolean;
    onClose: (canvas: unknown) => void;
}

const SignaturePad = (props: IProps) => {
    const onClose = props.onClose;
    const [showSignaturePad, setShowSignaturePad] = useState(props.show);
    useEffect(() => {
        setShowSignaturePad(props.show);
    }, [props.show]);

    return (
        <Modal
            onClose={() => onClose(null)}
            closeable
            isOpen={showSignaturePad}
            animate
            autoFocus
            size={SIZE.auto}
            role={ROLE.dialog}
            unstable_ModalBackdropScroll={true}
        >
            <ModalHeader>Hello world</ModalHeader>
            <ModalBody>
                <SignatureCanvas
                    penColor="green"
                    canvasProps={{width: 800, height: 350, className: 'signature-canvas'}}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton kind={KIND.secondary} onClick={() => onClose(null)}>
                    Reset
                </ModalButton>
                <ModalButton kind={KIND.primary} onClick={() => onClose('my signature')}>
                    Accept
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
};

export default SignaturePad;
