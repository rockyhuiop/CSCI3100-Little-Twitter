import classnames from "classnames";
import { useRef } from "react";
import { Camera } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import styles from "./EditableAvatar.module.css";

const EditableAvatar = ({
    username,
    avatar,
    size,
    reduceMargin,
    onAvatarChange,
}) => {
    const fileRef = useRef(null);

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
            <div className={editClassName}>
                <Camera onClick={() => fileRef.current.click()} />
            </div>
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
