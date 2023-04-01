import styles from "./ModalHeader.module.css";

const ModalHeader = ({ children }) => {
    return <div className={styles.header}>{children}</div>;
};

export default ModalHeader;
