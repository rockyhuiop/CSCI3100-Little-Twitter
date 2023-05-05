import styles from "./notification.module.css"
/* a function ti generate the notification message */
const Message = ({fols}) =>{
    return (
        <>
        <div className={styles.message}>
            {fols.name}@{fols.tweetID} followed you while you were not online.
        </div>
        </>
    )
}
export default Message;