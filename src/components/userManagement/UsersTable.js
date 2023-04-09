import UserActions from "./UserActions";
import { useUserMangement } from "./UserManagementContext";
import styles from "./UsersTable.module.css";

const UsersTable = () => {
    const { filtered } = useUserMangement();
    const abridgedID = (user) => {
        if (user._id.length >= 15) {
            return user._id.slice(0, 15) + "...";
        } else {
            return user._id;
        }
    };

    const copyID = (id) => {
        navigator.clipboard.writeText(id);
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>_id</th>
                    <th>username</th>
                    <th>tweetID</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {filtered.map((user) => {
                    return (
                        <tr key={user._id}>
                            <td onClick={() => copyID(user._id)}>
                                {abridgedID(user)}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.tweetID}</td>
                            <UserActions user={user} />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersTable;
