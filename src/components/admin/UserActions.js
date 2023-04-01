import EditButton from "./EditButton";
import RemoveButton from "./RemoveButton";
import SuspendButton from "./SuspendButton";
import styles from "./UserActions.module.css";

/**
 * It needs to know what user to act on
 */
const UserActions = ({ user }) => {
    return (
        <td className={styles.buttons}>
            <SuspendButton user={user} />
            <EditButton user={user} />
            <RemoveButton user={user} />
        </td>
    );
};

export default UserActions;
