import { useContext } from "react";
import { X } from "react-feather";
import { ModalContext } from "./Modal";

const ModalCross = () => {
    const { onClose } = useContext(ModalContext);
    return <X onClick={onClose} />;
};

export default ModalCross;
