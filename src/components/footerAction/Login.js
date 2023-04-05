import qs from "qs";
import { useNavigate } from "react-router-dom";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import LoginForm from "./LoginForm";
import styles from "./ModalBodies.module.css";

const Login = ({ isShowing, onClose, showRegister }) => {
    const nav = useNavigate();
    const handleSubmit = async (values) => {
        const response = await fetch("/login", {
            method: "POST",
            body: qs.stringify(values),
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const json = await response.json();
        if (!response.ok) {
            console.error(json.error);
        }
        nav("/bookmark", { replace: true });
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
                        one here
                    </p>
                </div>
            </ModalBody>
        </Modal>
    );
};
export default Login;
