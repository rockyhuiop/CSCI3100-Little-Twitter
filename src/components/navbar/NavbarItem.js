import classnames from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./NavbarItem.module.css";

/**
 * icon: the feather icon component being used. It is off type Icon, **not** a JSX.Element! (in other words, supply Home instead of <Home />)
 * to: href of the current item
 * name: link text, such as "Home", "Profile"
 */
const NavbarItem = ({ icon: Icon, to, name }) => {
    const getClassNames = ({ isActive }) => {
        return classnames(styles.link, isActive ? styles.active : "");
    };
    return (
        <NavLink to={to} className={getClassNames}>
            <Icon size={24} />
            <span>{name}</span>
        </NavLink>
    );
};

export default NavbarItem;
