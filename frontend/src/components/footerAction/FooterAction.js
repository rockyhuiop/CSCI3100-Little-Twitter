import { useUser } from "../../utils/UserContext";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import styles from "./FooterAction.module.css";
import Login from "./Login";
import Register from "./Register";

/**
 * The blue bar that is shown when the user is not logged in
 * It contains a button for Login and Register
 * When login is clicked, it shows the login form.
 * When register is clicked, it shows the register form.
 *
 * It will not be shown if the user is logged in.
 */
const FooterAction = () => {
    const { isLoggedIn } = useUser();

    /**
     * Two forms cannot show at the same time, so if one shows,
     * the other one must hide.
     */

    const {
        isShowing: isLogShowing,
        onClose: onLogClose,
        onOpen: onLogOpen,
    } = useModal();
    const {
        isShowing: isRegShowing,
        onClose: onRegClose,
        onOpen: onRegOpen,
    } = useModal();

    const showLogin = () => {
        onRegClose();
        onLogOpen();
    };

    const showRegister = () => {
        onLogClose();
        onRegOpen();
    };

    if (isLoggedIn) {
        return null;
    }

    return (
        // styles.disable
        <div className={styles.footer}>
            <p>Login to tweet, comment, follow people and more!</p>
            <div className={styles["button-group"]}>
                <Button onClick={onLogOpen} scheme={"secondary"}>
                    Login
                </Button>
                <Button onClick={onRegOpen} scheme={"pink"}>
                    Register
                </Button>
            </div>
            <Login
                isShowing={isLogShowing}
                onClose={onLogClose}
                showRegister={showRegister}
            />
            <Register
                isShowing={isRegShowing}
                onClose={onRegClose}
                showLogin={showLogin}
            />
        </div>
    );
};
export default FooterAction;
