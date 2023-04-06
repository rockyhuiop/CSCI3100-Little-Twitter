import qs from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import styles from "./ModalBodies.module.css";
import RegisterForm from "./RegisterForm";

const Register = ({ onClose, isShowing, showLogin }) => {
    const nav = useNavigate();
    const [error, setError] = useState("");
    const handleSubmit = async (values, helpers) => {
        if (values.password !== values.password2) {
            helpers.setFieldError(
                "password2",
                "This does not match the password."
            );
        }
        try {
            const response = await fetch("/registration", {
                method: "POST",
                body: qs.stringify(values),
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error);
            }
            setError("");
            showLogin();
        } catch (err) {
            console.error(err);
            setError(err.message);
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
