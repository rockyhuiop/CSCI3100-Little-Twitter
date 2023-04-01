import { useContext } from "react";
import { Camera, X } from "react-feather";
import { ProfileContext } from "../../pages/Profile";
import Avatar from "../profile/Avatar";
import Button from "../reusable/Button";
import TextInput from "../reusable/TextInput";
import styles from "./EditProfileModal.module.css";

const EditProfileModal = ({ username, biography }) => {
    const { closeEditInfo } = useContext(ProfileContext);

    // The modal has a black overlay outside of the actual modal box
    // most users expects that when that black overlay is clicked
    // the modal will be closed
    const closeIfBlackAreaClicked = (event) => {
        if (event.target === event.currentTarget) {
            closeEditInfo();
        }
    };

    return (
        <div className={styles.wrapper} onClick={closeIfBlackAreaClicked}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <X onClick={closeEditInfo} />
                        <span>Edit Profile</span>
                    </div>
                    <Button scheme={"secondary"} onClick={closeEditInfo}>
                        Save
                    </Button>
                </div>
                <div className={styles.banner}>
                    <div className={styles.edit}>
                        <Camera />
                    </div>
                </div>
                <div className={styles.avatar}>
                    <Avatar size="smaller" editable={true} />
                </div>
                <form className={styles.form}>
                    <TextInput label={"Name"} defaultValue={username} />
                    <TextInput
                        label={"Biography"}
                        type={"textarea"}
                        defaultValue={biography}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
