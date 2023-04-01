import Button from "../reusable/Button";
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
                            <td className={styles.buttons}>
                                <Button size="small">More & Edit</Button>
                                <Button
                                    size="small"
                                    variant={"outlined"}
                                    scheme={"secondary"}
                                >
                                    Suspend
                                </Button>
                                <Button size="small" scheme={"danger"}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersTable;
