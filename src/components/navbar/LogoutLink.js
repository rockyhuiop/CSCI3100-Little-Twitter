import { Fragment } from "react";
import { LogOut } from "react-feather";
import { useUser } from "../../utils/UserContext";
import styles from "./LogoutLink.module.css";
import NavbarItem from "./NavbarItem";

const LogoutLink = () => {
    const { logout, isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <Fragment>
            <div className={styles.spacing}>
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
