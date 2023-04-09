import classnames from "classnames";
import defaultUser from "../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../utils/constants";
import styles from "./Avatar.module.css";

const Avatar = ({ user: { avatar, username }, size, reduceMargin }) => {
    if (!size) {
        size = "larger";
    }

    const className = classnames(
        styles.avatar,
        styles[`avatar-${size}`],
        reduceMargin ? styles["reduce-margin"] : ""
    );

    return (
        <div>
            <img
                className={className}
                alt={`Avatar of user ${username}`}
                src={avatar ? SERVER_ADDRESS + avatar : defaultUser}
            ></img>
        </div>
    );
};

export default Avatar;
