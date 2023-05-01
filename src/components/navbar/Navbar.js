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

/**
 * The navbar of the web application.
 * For large devices, the navbar is shown on the LEFT of the main content,
 * whereas for smaller devices, the navbar is shown on TOP of the main content.
 *
 * The responsive styles are mostly in the CSS files, not much JavaScript is used.
 */
const Navbar = () => {
    const { isAdmin } = useUser();
    const [isShowing, setIsShowing] = useState(false);

    // only for mobile menu
    const toggleMenu = () => {
        setIsShowing(!isShowing);
    };

    // if user clicks on the link, remove the menu
    const handleClick = (event) => {
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
                {/* show the usual links for a logged in user */}
                <UserLinks />
                <LogoutLink />
                {/* only show admin links if the logged in user is an admin */}
                {isAdmin ? <AdminLinks /> : null}
                <AddTweetButton />
            </div>
        </div>
    );
};
export default Navbar;
