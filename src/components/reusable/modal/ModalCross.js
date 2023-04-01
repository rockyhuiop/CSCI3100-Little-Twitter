import { useContext } from "react";
import { X } from "react-feather";
import { ModalContext } from "./Modal";
import styles from "./ModalCross.module.css";

const ModalCross = () => {
    const { onClose } = useContext(ModalContext);
    return <X onClick={onClose} className={styles.cross} />;
};

export default ModalCross;
