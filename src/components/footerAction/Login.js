import qs from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import LoginForm from "./LoginForm";
import styles from "./ModalBodies.module.css";

const Login = ({ isShowing, onClose, showRegister }) => {
    const [error, setError] = useState("");
    const nav = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                body: qs.stringify(values),
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            console.log(json);
            if (!response.ok) {
                throw new Error(json.error);
            }
            setError("");
            // close the modal and redirect to profile page
            onClose();
            nav("/profile", { replace: true });
        } catch (err) {
            console.error(err);
            setError(err.message);
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
