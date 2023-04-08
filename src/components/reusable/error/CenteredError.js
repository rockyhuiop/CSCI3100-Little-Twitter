import styles from "./CenteredError.module.css";

const CenteredError = ({ children }) => {
    return (
        <div className={styles.center}>
            <p>{children}</p>
        </div>
    );
};

export default CenteredError;
