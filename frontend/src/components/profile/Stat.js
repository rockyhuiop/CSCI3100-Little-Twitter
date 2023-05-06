import styles from "./Stat.module.css";

/**
 * Shows follower count, following count etc. A dumb component.
 * name can be a function is the noun has to be pluralized for some numbers
 * name(need_plural: bool) => string
 */
const Stat = ({ count, name }) => {
    let _name = name;

    if (typeof name === "function") {
        _name = name(count !== 1);
    }

    return (
        <span className={styles.stat}>
            <span className={styles.count}>{count}</span>
            <span>{_name}</span>
        </span>
    );
};

export default Stat;
