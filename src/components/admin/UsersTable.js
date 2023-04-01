import UserActions from "./UserActions";
import styles from "./UsersTable.module.css";

const UsersTable = ({ users }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>handle</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.handle}</td>
                            <UserActions user={user} />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersTable;
