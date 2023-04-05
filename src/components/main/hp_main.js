import { useState } from "react";
import Search from "../search/search";
import Tweet from "../tweet/Tweet";
import styles from "./hp_main.module.css";

const Hp_main = () => {
    const [tweets, setTweets] = useState([
        {
            tweetId: "1",
            text: "Hello, Twitter!",
            user: {
                userId: "john_doe",
                name: "John Doe",
                profile_image_url:
                    "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
            },
            media: "",
            date: "",
            likeCount: 4,
            commentCount: 5,
            retweetCount: 6,
            viewCount: 1000,
        },
        {
            tweetId: "2",
            text: "Hello, Twitter!",
            user: {
                userId: "john_doe",
                name: "John Doe",
                profile_image_url:
                    "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
            },
            media: "",
            date: "",
            likeCount: 7,
            commentCount: 8,
            retweetCount: 9,
            viewCount: 20000,
        },
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>Home</h3>
                </div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
            <div className={styles.searchBar}>
                <Search />
            </div>
        </div>
    );
};
export default Hp_main;
