import classnames from "classnames";
import React, { useState } from "react";
import { Menu, Twitter } from "react-feather";
import { Link } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import AddTweetButton from "./AddTweetButton";
import AdminLinks from "./AdminLinks";
import LogoutLink from "./LogoutLink";
import styles from "./Navbar.module.css";
import UserLinks from "./UserLinks";

const Navbar = () => {
    const { isAdmin } = useUser();

    const [isShowing, setIsShowing] = useState(false);
    const toggleMenu = () => {
        setIsShowing(!isShowing);
    };

    const handleClick = (event) => {
        // if user clicks on the link, remove the menu
        if (event.target.tagName !== "P" && event.target.tagName !== "DIV") {
            setIsShowing(false);
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.top}>
                {/* shows twitter logo and text */}
                <Link to="/" className={styles.branding} onClick={handleClick}>
                    <Twitter size={36} />
                    <h2>Twitter</h2>
                </Link>
                <Menu className={styles.menu} onClick={toggleMenu} size={24} />
            </div>
            <div
                className={classnames(
                    styles.body,
                    isShowing ? styles.show : styles.hide
                )}
                onClick={handleClick}
            >
                <UserLinks />
                <LogoutLink />
                {isAdmin ? <AdminLinks /> : null}
                <AddTweetButton />
            </div>
        </div>
    );
};
export default Navbar;
