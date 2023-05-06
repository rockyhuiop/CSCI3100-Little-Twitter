import styles from "./AdminHeader.module.css";

/**
 * The header bar in user management admin page
 */
const AdminHeader = ({ children }) => {
    return (
        <div className={styles.header}>
            <h2>{children}</h2>
        </div>
    );
};

export default AdminHeader;
