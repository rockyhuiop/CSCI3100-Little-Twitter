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
import { useState, createContext } from 'react'

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

export const Add_twContext = createContext({
    Add_twActive: false,
    openAddTw: () => {},
    closeAddTw: () => {},
});

const Navbar = () => {
    const [Add_twActive, setAdd_twActive] = useState(false)
    
    const openAddTw = () => {
        setAdd_twActive(true);
    };

    const closeAddTw = () => {
        setAdd_twActive(false);
    };
    
    return (
        <>
            <Add_twContext.Provider
                value={{
                    Add_twActive,
                    openAddTw,
                    closeAddTw,
                }}
            >
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
                {Add_twActive ? <Add_tw /> : ""}
            </Add_twContext.Provider>
        </>
    );
};
export default Navbar;
