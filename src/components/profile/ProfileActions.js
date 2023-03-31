import Button from "../button/Button";
import styles from "./ProfileActions.module.css";

const ProfileActions = () => {
    return (
        <div className={styles.group}>
            <Button scheme={"primary"} text={"Follow"} />
            <Button scheme={"primary"} variant={"outlined"} text={"Edit"} />
        </div>
    );
};

export default ProfileActions;
