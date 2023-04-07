import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tweet from "../tweet/Tweet";
import styles from "./bookmark.module.css";

const Bookmark = () => {
    const nav = useNavigate();

    useEffect(() => {
        const checklog = async () => {
            const response = await fetch("/tweet/fetchTweet", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                console.log(json);
                nav("/", { replace: true });
            } else if (response.ok) {
                console.log("ok");
            }
        };
        checklog();
    });

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
    ]);
    return (
        <>
            <div className={styles.title}>Bookmarks</div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.tweetId} tweet={tweet} />
            ))}
        </>
    );
};
export default Bookmark;
