import { useState } from "react";
import Tabs from "../reusable/Tabs";
import Tweet from "../tweet/Tweet";
import styles from "./filter.module.css";

const Filter = () => {
    const [tweets, setTweets] = useState([
        {
            tweetId: 1,
            text: "Hello, Twitter!",
            user: {
                name: "John Doe",
                screen_name: "john_doe",
                profile_image_url: "https://example.com/john_doe.jpg",
            },
        },
        {
            tweetId: 2,
            text: "Hello, Twitter!",
            user: {
                name: "John Doe",
                screen_name: "john_doe",
                profile_image_url: "https://example.com/john_doe.jpg",
            },
        },
    ]);
    return (
        <Tabs tabNames={["Popular", "Recent"]}>
            <div className={styles.con}>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
            <div className={styles.con}>second tab test</div>
        </Tabs>
    );
};
export default Filter;
