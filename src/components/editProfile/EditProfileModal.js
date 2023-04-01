import { Camera } from "react-feather";
import Avatar from "../profile/Avatar";
import Button from "../reusable/Button";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import TextInput from "../reusable/TextInput";
import styles from "./EditProfileModal.module.css";

const EditProfileModal = ({ user, onClose, isShowing }) => {
    return (
        <Modal isShowing={isShowing} onClose={onClose}>
            <ModalHeader>
                <div className={styles.left}>
                    <ModalCross />
                    <span>Edit Profile</span>
                </div>
                <Button scheme={"secondary"} onClick={onClose}>
                    Save
                </Button>
            </ModalHeader>
            <ModalBody>
                <div className={styles.banner}>
                    <div className={styles.edit}>
                        <Camera />
                    </div>
                </div>
                <div className={styles.avatar}>
                    <Avatar size="smaller" editable={true} user={user} />
                </div>
                <form className={styles.form}>
                    <TextInput label={"Name"} defaultValue={user.username} />
                    <TextInput
                        label={"Biography"}
                        type={"textarea"}
                        defaultValue={user.biography}
                    />
                </form>
            </ModalBody>
        </Modal>
    );
};

export default EditProfileModal;
