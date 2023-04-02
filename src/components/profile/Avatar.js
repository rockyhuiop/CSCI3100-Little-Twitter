import classnames from "classnames";
import { Camera } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import styles from "./Avatar.module.css";

const Avatar = ({
    user: { avatar, username },
    editable,
    size,
    reduceMargin,
}) => {
    if (!size) {
        size = "larger";
    }

    const className = classnames(
        styles.avatar,
        styles[`avatar-${size}`],
        reduceMargin ? styles["reduce-margin"] : ""
    );
    const editClassName = classnames(styles.edit, styles[`edit-${size}`]);

    return (
        <div>
            <img
                className={className}
                alt={`Avatar of user ${username}`}
                src={avatar || defaultUser}
            ></img>
            {editable ? (
                <div className={editClassName}>
                    <Camera />
                </div>
            ) : null}
        </div>
    );
};

export default Avatar;
