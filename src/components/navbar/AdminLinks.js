import { MessageSquare, Users } from "react-feather";
import styles from "./AdminLinks.module.css";
import NavbarItems from "./NavbarItems";

const adminLinks = [
    {
        to: "/manage/user",
        icon: Users,
        name: "User Management",
    },
    {
        to: "/manage/tweets",
        icon: MessageSquare,
        name: "Message Managment",
    },
];

const AdminLinks = () => {
    return (
        <div className={styles.container}>
            <p className={styles.small}>Managment Tools</p>
            <NavbarItems links={adminLinks} spacing={16} />
        </div>
    );
};

export default AdminLinks;
