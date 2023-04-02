import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import styles from "./FooterAction.module.css";
import Login from "./Login";
import Register from "./Register";

const FooterAction = () => {
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

    return (
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
