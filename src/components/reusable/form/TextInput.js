import { useState } from "react";
import styles from "./TextInput.module.css";

/**
 * TextInput is a form input element that is for passwords, text, numbers
 * etc. and also textarea. Don't use this component if the input is a radio group, list etc.
 */
const TextInput = ({
    label,
    type = "text",
    placeholder,
    disabled,
    defaultValue,
}) => {
    const [text, setText] = useState(defaultValue);

    const onChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.group}>
            <label htmlFor="name">{label}</label>
            {type !== "textarea" ? (
                <input
                    type={type}
                    onChange={onChange}
                    value={text}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            ) : (
                <textarea
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={text}
                ></textarea>
            )}
        </div>
    );
};

export default TextInput;
