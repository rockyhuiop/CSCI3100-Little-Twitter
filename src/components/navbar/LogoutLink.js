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
        <div className={styles.spacing}>
            <NavbarItem name={"Logout"} icon={LogOut} customHandler={logout} />
        </div>
    );
};

export default LogoutLink;
