import styles from "./Stat.module.css";

/**
 * Shows follower count, following count etc. A dumb component.
 */
const Stat = ({ count, name }) => {
    return (
        <span className={styles.stat}>
            <span className={styles.count}>{count}</span>
            <span>{name}</span>
        </span>
    );
};

export default Stat;
