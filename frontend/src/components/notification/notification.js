import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import Message from "./message";
import styles from "./notification.module.css";
import { BACK_SER } from "../../utils/constants";

const Notification = () => {
    const { isLoggedIn } = useUser();
    const nav = useNavigate();
    const [fol, setFol] = useState([]); //to store new follower
    useEffect(() => {
        /* a function to fetch the new follwer to generate the notification message */
        const fetchNotif = async () => {
            const check_log = await fetch(BACK_SER+"/home",{
                method: "GET",
                credentials: "include",
            }); //to check if user is logged in
            if (!check_log.ok) {
                nav("/", { replace: true });        //force user go back to homepage if not logged in
            } else {                                //if logged in
                const new_fol = [];                 //a temp array to store the the new follwer
                /* fetch the new follower */
                const notification = await fetch(BACK_SER+"/user/notification/",{
                    method: "GET",
                    credentials: "include",
                });
                const notification_json = await notification.json();
                /* push the content of the fetched follwer into new_fol */
                for (let i = 0; i < notification_json.data.length; i++) {
                    new_fol.push({
                        tweetID: notification_json.data[i].tweetID,
                        name: notification_json.data[i].name,
                        id: notification_json.data[i]._id,
                    });
                }
                /* put the new follower fetched into the follwer list to be used */
                setFol(new_fol);
            }
        };
        fetchNotif();   //run the above function
    }, []);             //only run once
    return (
        <>
            <div className={styles.title}>Notification</div>
            {/* generate the notification message if there are new followers */}
            {fol.length === 0 ? (
                /* display below message to let user know no new follower */
                <div className={styles.message}>There is no new followers.</div>
            ) : (
                /* generate the notification message */
                fol.map((fols) => <Message key={fols.id} fols={fols} />)
            )}
        </>
    );
};
export default Notification;
