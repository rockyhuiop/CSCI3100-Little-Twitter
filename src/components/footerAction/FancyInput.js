import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import styles from "./FancyInput.module.css";

const FancyInput = ({ placeholder, required, label, name, type }) => {
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);

    if (type === "password") {
        return (
            <div className={styles.box}>
                <input
                    placeholder={placeholder}
                    name={name}
                    className={styles.input}
                    type={isPasswordShowing ? "text" : "password"}
                />
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
                {isPasswordShowing ? (
                    <Eye
                        id="open"
                        className={styles.eye}
                        onClick={() => setIsPasswordShowing(false)}
                    />
                ) : (
                    <EyeOff
                        id="close"
                        className={styles.eye}
                        onClick={() => setIsPasswordShowing(true)}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={styles.box}>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                name={name}
                className={styles.input}
            />
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
        </div>
    );
};

export default FancyInput;
