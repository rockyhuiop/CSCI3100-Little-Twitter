import Button from "../button/Button";
import styles from "./ProfileActions.module.css";

const ProfileActions = () => {
    return (
        <div className={styles.group}>
            <Button scheme={"primary"}>Follow</Button>
            <Button scheme={"primary"} variant={"outlined"}>
                Edit
            </Button>
        </div>
    );
};

export default ProfileActions;
