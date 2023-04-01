import { Fragment } from "react";
import Button from "../reusable/Button";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import { useModal } from "../reusable/modal/useModal";
import styles from "./RemoveButton.module.css";

const RemoveButton = ({ user }) => {
    const { isShowing, onClose, onOpen } = useModal();

    return (
        <Fragment>
            <Button size="small" scheme={"danger"} onClick={onOpen}>
                Remove
            </Button>
            <Modal isShowing={isShowing} onClose={onClose}>
                <ModalHeader>
                    <ModalCross />
                </ModalHeader>
                <ModalBody>
                    <p className={styles.text}>
                        Are you sure that <b>{user.username}</b> should be
                        deleted? This cannot be undone!
                    </p>
                    {/* currently it does nothing */}
                    <Button size="big" scheme={"danger"} onClick={onClose}>
                        Delete User!
                    </Button>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default RemoveButton;
