import { useState } from "react";
import styles from "./bookmark.module.css"
import Tweet from "../tweet/Tweet";

const Bookmark = () => {
    const [tweets, setTweets] = useState([
        {
            id: 1,
            text: "Hello, Twitter!",
            user: {
                name: "John Doe",
                screen_name: "john_doe",
                profile_image_url: "https://example.com/john_doe.jpg",
            },
        },
        
    ]);
    return (
        <>
            <div className={styles.title}>Bookmarks</div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </>
    );
};
export default Bookmark;
