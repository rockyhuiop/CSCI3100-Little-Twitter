import { Bookmark, Hash, Home, MessageSquare, User } from "react-feather";
import { useUser } from "../../utils/UserContext";
import NavbarItems from "./NavbarItems";
import styles from "./UserLinks.module.css";

/**
 * The following constants stores the properties required for each link in the
 * navigation bar Also see `NavbarItem.js` for more details.
 */

// when the user is not logged in, show these only
const notLoggedInLinks = [
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
];

// when the user is logged in, show all of these
const loggedInLinks = [
    ...notLoggedInLinks,
    {
        to: "/bookmark",
        icon: Bookmark,
        name: "Bookmark",
    },
    {
        to: "/notification",
        icon: MessageSquare,
        name: "Notification",
    },
    {
        to: "/profile",
        icon: User,
        name: "Profile",
    },
];

const UserLinks = () => {
    const { isLoggedIn } = useUser();

    return (
        <div className={styles.container}>
            <NavbarItems
                links={isLoggedIn ? loggedInLinks : notLoggedInLinks}
            />
        </div>
    );
};

export default UserLinks;
