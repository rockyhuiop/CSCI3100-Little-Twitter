import classnames from "classnames";
import defaultUser from "../../assets/default.jpg";
import { useImage } from "../../utils/useImage";
import styles from "./Avatar.module.css";

const Avatar = ({
    user: { avatar: _avatar, username },
    size,
    reduceMargin,
}) => {
    if (!size) {
        size = "larger";
    }

    const avatar = useImage(_avatar);

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
                src={avatar || defaultUser}
            ></img>
        </div>
    );
};

export default Avatar;