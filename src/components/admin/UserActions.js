import { Delete, Edit, Pause } from "react-feather";
import IconMenu from "../reusable/IconMenu";
import EditButton from "./EditButton";
import RemoveButton from "./RemoveButton";
import SuspendButton from "./SuspendButton";
import styles from "./UserActions.module.css";

/**
 * It needs to know what user to act on
 */
const UserActions = ({ user }) => {
    return (
        <td>
            <div className={styles.large}>
                <SuspendButton user={user} />
                <EditButton user={user} />
                <RemoveButton user={user} />
            </div>
            <div className={styles.small}>
                <IconMenu
                    names={["Suspend", "Edit", "Remove"]}
                    keySuffix={user.id}
                    clickHandlers={[null, null, null]}
                    icons={[
                        <Pause size={16} />,
                        <Edit size={16} />,
                        <Delete size={16} />,
                    ]}
                />
            </div>
        </td>
    );
};

export default UserActions;
