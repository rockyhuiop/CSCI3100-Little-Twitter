import { useField } from "formik";
import styles from "./FancyInput.module.css";

/**
 * The beautiful input for the login and register forms
 * Not used in other components
 *
 * Receives the usual props of a input
 */
const FancyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.box}>
            <input
                {...field}
                {...props}
                className={styles.input}
                id={field.name}
                placeholder={props.name}
            />
            {/* this label is styled so that it is at the center of the input
            box when not focused, or at the left upper corner when focused. See
            the styles for more details. */}
            <label htmlFor={props.name || props.id} className={styles.label}>
                {label}
            </label>
            {/* show the error messages below */}
            {meta.touched && meta.error ? (
                <p className={styles.error}>{meta.error}</p>
            ) : null}
        </div>
    );
};

export default FancyInput;
