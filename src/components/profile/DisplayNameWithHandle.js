import styles from "./DisplayNameWithHandle.module.css";

const DisplayNameWithHandle = ({
    user: { name: username, tweetID: handle },
}) => {
    return (
        <div>
            <h1 className={styles.username}>{username}</h1>
            <span className={styles.handle}>@{handle}</span>
        </div>
    );
};

export default DisplayNameWithHandle;
