import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import Message from "./message";
import styles from "./notification.module.css";

const Notification = () => {
    const { isLoggedIn } = useUser();
    const nav = useNavigate();
    const [fol, setFol] = useState([]);
    useEffect(() => {
        const fetchNotif = async () => {
            const check_log = await fetch("/home");
            if (!check_log.ok) {
                nav("/", { replace: true });
            } else {
                const new_fol = [];
                const notification = await fetch("/user/notification/");
                const notification_json = await notification.json();
                for (let i = 0; i < notification_json.data.length; i++) {
                    new_fol.push({
                        tweetID: notification_json.data[i].tweetID,
                        name: notification_json.data[i].name,
                        id: notification_json.data[i]._id,
                    });
                }
                setFol(new_fol);
            }
        };
        fetchNotif();
    }, []);
    return (
        <>
            <div className={styles.title}>Notification</div>
            {fol.length === 0 ? (
                <div className={styles.message}>There is no new followers.</div>
            ) : (
                fol.map((fols) => <Message key={fols.id} fols={fols} />)
            )}
        </>
    );
};
export default Notification;
