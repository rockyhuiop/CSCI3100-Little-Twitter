import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import styles from "./ModalBodies.module.css";
import RegisterForm from "./RegisterForm";

const Register = ({ onClose, isShowing, showLogin }) => {
    const handleSubmit = (values, helpers) => {
        if (values.password !== values.password2) {
            helpers.setFieldError(
                "password2",
                "This does not match the password."
            );
        }
    };

    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"420px"}>
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
                        one here
                    </p>
                </div>
            </ModalBody>
        </Modal>
    );
};
export default Register;
