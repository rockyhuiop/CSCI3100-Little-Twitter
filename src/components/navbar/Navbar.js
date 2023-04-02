import React from "react";
import { Twitter } from "react-feather";
import { Link } from "react-router-dom";
import AddTweetButton from "./AddTweetButton";
import AdminLinks from "./AdminLinks";
import styles from "./Navbar.module.css";
import UserLinks from "./UserLinks";

const Navbar = () => {
    return (
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
    );
};
export default Navbar;
