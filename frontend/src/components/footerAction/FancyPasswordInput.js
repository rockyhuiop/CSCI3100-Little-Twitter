import { useField } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import styles from "./FancyInput.module.css";

/**
 * Similar to the FancyInput.js component, but with visibility toggle
 *
 * When the eye icon is closed, show the password as dots
 * When the eye icon is opened, show the password as text
 *
 * Receives the usual props of an input
 */
const FancyPasswordInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);

    return (
        <div className={styles.box}>
            <div className={styles["password-box"]}>
                <input
                    {...field}
                    {...props}
                    id={field.name}
                    className={styles.input}
                    type={isPasswordShowing ? "text" : "password"}
                    placeholder={props.name}
                />
                <label
                    htmlFor={props.name || props.id}
                    className={styles.label}
                >
                    {label}
                </label>
                {isPasswordShowing ? (
                    <Eye
                        className={styles.eye}
                        onClick={() => setIsPasswordShowing(false)}
                    />
                ) : (
                    <EyeOff
                        className={styles.eye}
                        onClick={() => setIsPasswordShowing(true)}
                    />
                )}
            </div>
            {/* show the error below */}
            {meta.touched && meta.error ? (
                <p className={styles.error}>{meta.error}</p>
            ) : null}
        </div>
    );
};

export default FancyPasswordInput;
