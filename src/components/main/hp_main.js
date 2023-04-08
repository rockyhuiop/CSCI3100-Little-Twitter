import { useState, useEffect } from "react";
import Search from "../search/search";
import Tweet from "../tweet/Tweet";
import styles from "./hp_main.module.css";
import AddTweetReuse from "../reusable/AddTweetReuse";
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

    const msg = "What's happening?";
    const btn = "Tweet";

    useEffect(() => {
        const checklog = async () => {
            const response = await fetch("/tweet/fetchHomeTweet", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            if (!response.ok) {
            } else if (response.ok) {
                console.log("ok");
                const new_tw = [];
                for (var i = 0; i < json.message.length; i++) {
                    new_tw.push({
                        tweetId: [i],
                        text: json.message[i].Content,
                        user: {
                            userId: json.message[i].CreatorUserID,
                            name: json.message[i].CreatorUserName,
                            profile_image_url:
                                "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                        },
                        media: "",
                        date: "",
                        likeCount: json.message[i].LikeCount,
                        commentCount: json.message[i].CommentCount,
                        retweetCount: json.message[i].ReTweetCount,
                        viewCount: 1000,
                    });
                }
                setTweets(new_tw);
            }
        };
        checklog();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>Home</h3>
                </div>
                <AddTweetReuse msg={msg} btn={btn} />
                {tweets.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
            <div className={styles.searchBar}>
                <Search />
            </div>
        </div>
    );
};
export default Hp_main;
