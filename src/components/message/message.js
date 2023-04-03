import { useState } from "react";
import styles from "./message.module.css"


const Message = () => {
    
    return (
        <>
            <div className={styles.title}>Message</div>
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
export default Message;
