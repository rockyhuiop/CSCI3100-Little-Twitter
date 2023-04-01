import { useContext } from "react";
import { ProfileContext } from "../../pages/Profile";
import Button from "../reusable/Button";
import styles from "./ProfileActions.module.css";

const ProfileActions = () => {
    const { openEditInfo } = useContext(ProfileContext);

    return (
        <div className={styles.group}>
            <Button scheme={"primary"}>Follow</Button>
            <Button
                scheme={"primary"}
                variant={"outlined"}
                onClick={openEditInfo}
            >
                Edit
            </Button>
        </div>
    );
};

export default ProfileActions;
