import React from "react";
import {
    Bookmark,
    Hash,
    Home,
    MessageSquare,
    Twitter,
    User,
} from "react-feather";
import { Link } from "react-router-dom";
import Add_tw from "../add_tw";
import AddTweetButton from "./AddTweetButton";
import styles from "./Navbar.module.css";
import NavbarItem from "./NavbarItem";

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

const Navbar = () => {
    return (
        <>
            <div className={styles.navbar}>
                {/* shows twitter logo and text */}
                <Link to="/" className={styles.branding}>
                    <Twitter size={36} />
                    <h2>Twitter</h2>
                </Link>
                {/* render links */}
                <div className={styles.links}>
                    {links.map(({ to, icon, name }, index) => {
                        return (
                            <NavbarItem
                                to={to}
                                icon={icon}
                                name={name}
                                key={`nav-item-${index}`}
                            />
                        );
                    })}
                </div>
                {/* actions */}
                <AddTweetButton />
            </div>
            <Add_tw />
        </>
    );
};
export default Navbar;
