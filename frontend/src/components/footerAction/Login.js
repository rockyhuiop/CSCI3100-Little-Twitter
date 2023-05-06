import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import LoginForm from "./LoginForm";
import styles from "./ModalBodies.module.css";

/**
 * The login modal
 *
 * isShowing: is the modal showing
 * onClose: what to do when the modal is closed
 * showRegister: when this function is called, this modal should be closed and
 * the register form should show. Implemented by the parent component
 */
const Login = ({ isShowing, onClose, showRegister }) => {
    const { login } = useUser();
    const [error, setError] = useState("");
    const nav = useNavigate();
    const handleSubmit = async (values) => {
        const error = await login(values);
        if (!error) {
            setError("");
            // close the modal and redirect to profile page
            onClose();
            nav("/profile", { replace: true });
        } else {
            setError(error);
        }
    };

    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"420px"}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <div className={styles.container}>
                    <h2>Login</h2>
                    <LoginForm handleSubmit={handleSubmit} />
                    <p className={styles.hint}>
                        Do not have an account?
                        <span onClick={showRegister}>Register</span>
                        one here.
                    </p>
                    {error ? (
                        <p className={styles.error}>Error: {error}</p>
                    ) : null}
                </div>
            </ModalBody>
        </Modal>
    );
};
export default Login;
