import classnames from "classnames";
import { useRef } from "react";
import { Camera } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import styles from "./EditableAvatar.module.css";

/**
 * The avatar of that user with a edit icon
 * If the user clicks it, a file dialog will be shown
 * for users to select a new avatar.
 *
 * username: the username of that user, for the alt attribute of images (when the avatar doesn't load correctly, show the alt tag)
 * avatar: an url to the avatar
 * size: how big the avatar is. Accepts "smaller | "larger"
 * reduceMargin: Less margin to the bottom or not
 * onAvatarChange: calls when the avatar changes
 */
const EditableAvatar = ({
    username,
    avatar,
    size,
    reduceMargin,
    onAvatarChange,
}) => {
    // for the hidden file input
    const fileRef = useRef(null);

    // only use the first file that the user has selected
    const onChange = (event) => {
        onAvatarChange(event.target.files[0]);
    };

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
            {/* the icon */}
            <div className={editClassName}>
                <Camera onClick={() => fileRef.current.click()} />
            </div>
            {/* the hidden input, only show when the icon is clicked */}
            <input
                type="file"
                onChange={onChange}
                className={styles.hide}
                ref={fileRef}
            />
        </div>
    );
};

export default EditableAvatar;
