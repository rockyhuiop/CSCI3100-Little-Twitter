import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import styles from "./notification.module.css"
import Message from "./message"


const Notification = () => {
    const { isLoggedIn } = useUser();
    const nav = useNavigate();
    const [fol,setFol] = useState([

    ]);
    useEffect(() => {
        if (!isLoggedIn) {
            nav("/", { replace: true });
        } else{
            const fetchNotif = async() =>{
                const new_fol=[];
                const notification = await fetch("/user/notification/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    }
                );
                const notification_json = await notification.json();
                for (var i=0;i<notification_json.data.length;i++){
                    new_fol.push(
                        {
                        tweetID: notification_json.data[i].tweetID,
                        name: notification_json.data[i].name,
                        id: notification_json.data[i]._id,
                        },
                    );
                }
                setFol(new_fol);
            }

            fetchNotif();
            
        }
    },[]);
    return (
        <>
            <div className={styles.title}>Notification</div>
            {fol.length==0 ? 
            <div className={styles.message}>
                There is no new followers.
            </div>
            :
            fol.map((fols) => (
                <Message key={fols.id} fols={fols} />
            ))
            }
        </>
    );
};
export default Notification;
