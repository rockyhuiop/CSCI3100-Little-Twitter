import styles from "./DisplayNameWithHandle.module.css";

const DisplayNameWithHandle = ({ username, handle }) => {
    return (
        <div>
            <h1 className={styles.username}>{username || "Lorem Ipsum"}</h1>
            <span className={styles.handle}>@{handle || "lorem1"}</span>
        </div>
    );
};

export default DisplayNameWithHandle;
