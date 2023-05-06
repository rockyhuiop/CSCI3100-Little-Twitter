import styles from "./ModalBody.module.css";

/*
The main content of a modal
Used inside a Modal component
usually it is below the ModalHeader
*/
const ModalBody = ({ children }) => {
    return <div className={styles.body}>{children}</div>;
};

export default ModalBody;
