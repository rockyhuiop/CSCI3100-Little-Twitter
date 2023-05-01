import styles from "./ModalHeader.module.css";

/*
Used in Modals
usually it is on top of the ModalBody
*/
const ModalHeader = ({ children }) => {
    return <div className={styles.header}>{children}</div>;
};

export default ModalHeader;
