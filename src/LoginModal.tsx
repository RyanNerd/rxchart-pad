import {KIND} from 'baseui/button';
import {CLOSE_SOURCE, Modal, ModalBody, ModalButton, ModalHeader, ROLE, SIZE} from 'baseui/modal';
import React, {useEffect, useState} from 'react';
import './styles/neumorphism.css';

interface IProps {
    show: boolean;
    onClose: (apiKey: string | null) => void;
}

const LoginModal = (props: IProps) => {
    const onClose = props.onClose;
    const [showModal, setShowModal] = useState(props.show);
    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    const handleLoginClick = () => {
        // TODO: Access login API to validate credentials and return the actual API key
        onClose('yyz-rush-is-awesome');
        setShowModal(false);
    };

    return (
        <Modal
            animate
            autoFocus
            closeable
            isOpen={showModal}
            onClose={(closeSource) => {
                if (closeSource.closeSource !== CLOSE_SOURCE.backdrop) onClose(null);
            }}
            role={ROLE.dialog}
            size={SIZE.auto}
            unstable_ModalBackdropScroll={true}
        >
            <ModalHeader>Login </ModalHeader>
            <ModalBody>
                <span>Login stuff</span>
            </ModalBody>
            <ModalButton kind={KIND.primary} onClick={() => handleLoginClick()}>
                Login
            </ModalButton>
        </Modal>
    );
};

export default LoginModal;
