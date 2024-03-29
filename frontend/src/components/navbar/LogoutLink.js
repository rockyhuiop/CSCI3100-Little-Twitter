import { Fragment } from "react";
import { LogOut } from "react-feather";
import { useUser } from "../../utils/UserContext";
import styles from "./LogoutLink.module.css";
import NavbarItem from "./NavbarItem";

/**
 * It is a logout button, but with the styling of a link
 */
const LogoutLink = () => {
    const { logout, isLoggedIn, isAdmin } = useUser();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <Fragment>
            <div className={isAdmin ? styles["spacing-admin"] : styles.spacing}>
                <NavbarItem
                    name={"Logout"}
                    icon={LogOut}
                    customHandler={logout}
                />
            </div>
        </Fragment>
    );
};

export default LogoutLink;
