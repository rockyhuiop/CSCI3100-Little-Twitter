import defaultUser from "../../assets/default.jpg";
import styles from "./Avatar.module.css";

const Avatar = ({ avatar, username }) => {
    if (avatar) {
        return (
            <img
                className={styles.avatar}
                alt={`Avatar of user ${username}`}
            ></img>
        );
    } else {
        return (
            <img
                className={styles.avatar}
                alt={`Avatar of user ${username}`}
                src={defaultUser}
            ></img>
        );
    }
};

export default Avatar;
