import styles from "./CenteredStatus.module.css";

const CenteredError = ({ children }) => {
    return (
        <div className={styles.center}>
            <p>{children}</p>
        </div>
    );
};

export default CenteredError;
