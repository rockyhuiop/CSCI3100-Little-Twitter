import { useState } from "react";
import styles from "./notification.module.css"


const Notification = () => {
    
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
