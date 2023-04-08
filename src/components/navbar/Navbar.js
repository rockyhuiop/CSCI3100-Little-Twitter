import classnames from "classnames";
import React, { useState } from "react";
import { Menu, Twitter } from "react-feather";
import { Link } from "react-router-dom";
import AddTweetButton from "./AddTweetButton";
import AdminLinks from "./AdminLinks";
import styles from "./Navbar.module.css";
import UserLinks from "./UserLinks";


const Navbar = ({identity}) => {
    const [isShowing, setIsShowing] = useState(false);
    const toggleMenu = () => {
        setIsShowing(!isShowing);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.top}>
                {/* shows twitter logo and text */}
                <Link to="/" className={styles.branding}>
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
            >
                <UserLinks log={identity=="guest" ? false : true}/>
                {identity=="admin" ? <AdminLinks /> : " "}
                {identity=="guest" ? " " :<AddTweetButton />}
            </div>
        </div>
    );
};
export default Navbar;
