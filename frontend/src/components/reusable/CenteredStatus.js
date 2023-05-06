import styles from "./CenteredStatus.module.css";

/**
 * A centered div container, nothing else.
 */
const CenteredStatus = ({ children }) => {
    return (
        <div className={styles.center}>
            <p>{children}</p>
        </div>
    );
};

export default CenteredStatus;
