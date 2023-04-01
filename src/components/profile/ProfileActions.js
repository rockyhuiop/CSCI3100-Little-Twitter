import EditProfile from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import styles from "./ProfileActions.module.css";

const ProfileActions = ({ user }) => {
    const { onClose, isShowing, onOpen } = useModal();

    return (
        <div className={styles.group}>
            <Button scheme={"primary"}>Follow</Button>
            <Button scheme={"primary"} variant={"outlined"} onClick={onOpen}>
                Edit
            </Button>
            <EditProfile isShowing={isShowing} onClose={onClose} user={user} />
        </div>
    );
};

export default ProfileActions;
