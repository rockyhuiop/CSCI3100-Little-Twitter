import React, { createContext, useState } from "react";
import { Twitter } from "react-feather";
import { Link } from "react-router-dom";
import Add_tw from "../add_tw";
import AddTweetButton from "./AddTweetButton";
import AdminLinks from "./AdminLinks";
import styles from "./Navbar.module.css";
import UserLinks from "./UserLinks";

export const Add_twContext = createContext({
    Add_twActive: false,
    openAddTw: () => {},
    closeAddTw: () => {},
});

const Navbar = () => {
    const [Add_twActive, setAdd_twActive] = useState(false);

    const openAddTw = () => {
        setAdd_twActive(true);
    };

    const closeAddTw = () => {
        setAdd_twActive(false);
    };

    return (
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
                <UserLinks />
                <AdminLinks />
                <AddTweetButton />
            </div>
            {Add_twActive ? <Add_tw /> : ""}
        </Add_twContext.Provider>
    );
};
export default Navbar;
