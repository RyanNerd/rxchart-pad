import {CLOSE_SOURCE, Modal, ModalBody, ModalHeader, ROLE, SIZE} from 'baseui/modal';
import {IAuthManager} from "managers/authManager";
import React, {useEffect, useState} from 'react';
import {ReactComponent as LockIcon} from './icons/lock.svg';
import {ReactComponent as UserIcon} from './icons/user.svg';

interface IProps {
    authenticationManager: IAuthManager;
    show: boolean;
    onClose: (apiKey: string | null) => void;
}

const LoginModal = (props: IProps) => {
    const am = props.authenticationManager;
    const onClose = props.onClose;
    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Fires when the user clicks on the login button
     */
    const handleLoginClick = () => {
        const validateCredentials = async () => {
            const auth = await am.authenticate(username, password);
            if (auth.success) {
                onClose(auth.apiKey);
                setShow(false);
            } else {
                // TODO: Build out actual alert
                alert('Username or password is incorrect');
            }
        }
        validateCredentials();
    };

    return (
        <Modal
            animate
            autoFocus
            closeable
            isOpen={show}
            onClose={(closeSource) => {
                if (closeSource.closeSource !== CLOSE_SOURCE.backdrop) onClose(null);
            }}
            role={ROLE.dialog}
            size={SIZE.auto}
            unstable_ModalBackdropScroll={true}
        >
            <div className="neu-main">
                <ModalHeader><h2 className="neu-field">Login</h2> </ModalHeader>
            </div>
            <div className="neu-main">
                <ModalBody>
                    <div className="neu-main">
                        <div className="neu-content-login">
                            <div className="neu-field">
                                <UserIcon style={{marginTop: '12px', marginLeft: '15px'}} />
                                <input
                                    autoFocus
                                    onChange={(changeEvent) => setUsername(changeEvent.target.value)}
                                    placeholder="Username"
                                    required
                                    type="text"
                                    value={username}
                                />
                            </div>

                            <div className="neu-field">
                                <LockIcon style={{marginTop: '12px', marginLeft: '15px'}} />
                                <input
                                    onChange={(changeEvent) => setPassword(changeEvent.target.value)}
                                    onKeyUp={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                                        if (keyboardEvent.key === 'Enter') handleLoginClick();
                                    }}
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </div>
            <div className="neu-main">
                <button className="neu-button mb-3" onClick={() => handleLoginClick()}>
                    Login
                </button>
            </div>
        </Modal>
    );
};

export default LoginModal;
