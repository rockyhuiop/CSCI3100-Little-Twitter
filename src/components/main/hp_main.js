import { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext";
import AddTweet from "../reusable/AddTweet";
import Search from "../search/search";
import Tweet from "../tweet/Tweet";
import styles from "./hp_main.module.css";
import {CalTime} from "../reusable/CalTime"
const Hp_main = () => {
    const { isLoggedIn } = useUser();
    const [tweets, setTweets] = useState([
        /*{
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
        },*/
    ]);
    
    const msg = "What's happening?";
    const btn = "Tweet";

    useEffect(() => {
        const checklog = async () => {
            
            const login = await fetch("/home/fetchHomeTweet", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const log_json = await login.json();
            
            if (!login.ok) {
                const not_login = await fetch("/home/FetchAllTweet", {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                    },
                });
                const not_log_json = await not_login.json();
                
                const new_tw = [];
                for (var i = 0; i < not_log_json.message.length; i++) {
                    new_tw.push({
                        tweetId: i,
                        text: not_log_json.message[i].Content,
                        user: {
                            userId: not_log_json.message[i].CreatorUserID,
                            name: not_log_json.message[i].CreatorUserName,
                            profile_image_url:
                                "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                        },
                        media: "",
                        date: "",
                        likeCount: not_log_json.message[i].LikeCount,
                        commentCount: not_log_json.message[i].CommentCount,
                        retweetCount: not_log_json.message[i].ReTweetCount,
                        viewCount: 1000,
                    });
                }
                setTweets(new_tw);
                
            } else if (login.ok) {
                const new_tw = [];
                for (var i = 0; i < log_json.message.length; i++) {
                    new_tw.push({
                        tweetId: i,
                        text: log_json.message[i].Content,
                        user: {
                            userId: log_json.message[i].CreatorUserID,
                            name: log_json.message[i].CreatorUserName,
                            profile_image_url:
                                "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                        },
                        media: "",
                        date: CalTime(log_json.message[i].CreateTime),
                        likeCount: log_json.message[i].LikeCount,
                        commentCount: log_json.message[i].CommentCount,
                        retweetCount: log_json.message[i].ReTweetCount,
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
                {isLoggedIn ? <AddTweet msg={msg} btn={btn} /> : null}
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
