import { useField } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import styles from "./FancyInput.module.css";

const FancyPasswordInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);

    return (
        <div className={styles.box}>
            <div className={styles["password-box"]}>
                <input
                    {...field}
                    {...props}
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
            {meta.touched && meta.error ? <p>{meta.error}</p> : null}
        </div>
    );
};

export default FancyPasswordInput;
