import styles from "./CenteredStatus.module.css";

const CenteredStatus = ({ children }) => {
    return (
        <div className={styles.center}>
            <p>{children}</p>
        </div>
    );
};

export default CenteredStatus;
