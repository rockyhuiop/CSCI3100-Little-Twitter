import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import styles from "./notification.module.css"


const Notification = () => {
    const { isLoggedIn } = useUser();
    const nav = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            nav("/", { replace: true });
        }
    });
    return (
        <>
            <div className={styles.title}>Notification</div>
            <div className={styles.message}>
                Testing message 1
            </div>
            <div className={styles.message}>
                Testing message 2
            </div>
            <div className={styles.message}>
                Testing message 3
            </div>
        </>
    );
};
export default Notification;
