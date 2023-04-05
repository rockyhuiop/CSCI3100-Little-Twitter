import { useField } from "formik";
import styles from "./FancyInput.module.css";

const FancyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.box}>
            <input
                {...field}
                {...props}
                className={styles.input}
                placeholder={props.name}
            />
            <label htmlFor={props.name || props.id} className={styles.label}>
                {label}
            </label>
            {meta.touched && meta.error ? <p>{meta.error}</p> : null}
        </div>
    );
};

export default FancyInput;
