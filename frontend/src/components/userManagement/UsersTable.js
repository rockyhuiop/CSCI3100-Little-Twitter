import { Link } from "react-router-dom";
import UserActions from "./UserActions";
import { useUserMangement } from "./UserManagementContext";
import styles from "./UsersTable.module.css";

/**
 * Lists all the users in the database in a table
 * The first row shows their _id, second username, third tweetID
 * and finally a list of actions admins can do
 * see UserActions.js for more details.
 */
const UsersTable = () => {
    const { filtered } = useUserMangement();
    const abridgedID = (user) => {
        if (user._id.length >= 15) {
            return user._id.slice(0, 15) + "...";
        } else {
            return user._id;
        }
    };

    // copy the id to clipboard when it is clicked
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
            {/* thead and tbody both uses the same role, I have no way but to add this one */}
            <tbody data-testid="users-table">
                {filtered.map((user) => {
                    return (
                        <tr key={user._id}>
                            <td onClick={() => copyID(user._id)}>
                                <Link to={`/profile/${user.tweetID}`}>
                                    {abridgedID(user)}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/profile/${user.tweetID}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/profile/${user.tweetID}`}>
                                    {user.tweetID}
                                </Link>
                            </td>
                            <UserActions user={user} />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersTable;
