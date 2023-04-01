import { Bookmark, Hash, Home, MessageSquare, User } from "react-feather";
import NavbarItems from "./NavbarItems";
import styles from "./UserLinks.module.css";

/**
 * This stores the properties required for each link in the navigation bar
 * Also see `NavbarItem.js` for more details.
 */
const links = [
    {
        to: "/",
        icon: Home,
        name: "Homepage",
    },
    {
        to: "/explore",
        icon: Hash,
        name: "Explore",
    },
    {
        to: "/bookmark",
        icon: Bookmark,
        name: "Bookmark",
    },
    {
        to: "/message",
        icon: MessageSquare,
        name: "Message",
    },
    {
        to: "/profile",
        icon: User,
        name: "Profile",
    },
];

const UserLinks = () => {
    return (
        <div className={styles.container}>
            <NavbarItems links={links} />
        </div>
    );
};

export default UserLinks;
