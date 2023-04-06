import { useField } from "formik";
import styles from "./TextInput.module.css";

/**
 * TextInput is a form input element that is for passwords, text, numbers
 * etc. and also textarea. Don't use this component if the input is a radio group, list etc.
 */
const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.group}>
            <label htmlFor="name">{label}</label>
            {props.type !== "textarea" ? (
                <input {...field} {...props} />
            ) : (
                <textarea {...field} {...props}></textarea>
            )}
            {meta.touched && meta.error ? (
                <p className={styles.error}>{meta.error}</p>
            ) : null}
        </div>
    );
};

export default TextInput;
