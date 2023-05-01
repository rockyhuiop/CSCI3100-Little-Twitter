import { useState } from "react";
import { useUser } from "../../utils/UserContext";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import styles from "./ModalBodies.module.css";
import RegisterForm from "./RegisterForm";

/**
 * The register modal
 *
 * isShowing: is the modal showing
 * onClose: what to do when the modal is closed
 * showLogin: when this function is called, this modal should be closed and
 * the login form should show. Implemented by the parent component
 */
const Register = ({ onClose, isShowing, showLogin }) => {
    const { register } = useUser();
    const [error, setError] = useState("");
    const handleSubmit = async (values, helpers) => {
        if (values.password !== values.password2) {
            helpers.setFieldError(
                "password2",
                "This does not match the password."
            );
        }
        const error = await register(values);
        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setError("");
            showLogin();
        }
    };

    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"960px"}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <div className={styles.container}>
                    <h2>Register</h2>
                    <RegisterForm handleSubmit={handleSubmit} />
                    <p className={styles.hint}>
                        Already got an account?
                        <span onClick={showLogin}>Login</span>
                        here.
                    </p>
                    {error ? (
                        <p className={styles.error}>Error: {error}</p>
                    ) : null}
                </div>
            </ModalBody>
        </Modal>
    );
};
export default Register;
