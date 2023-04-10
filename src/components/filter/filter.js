import { useState, useEffect } from "react";
import Tabs from "../reusable/Tabs";
import Tweet from "../tweet/Tweet";
import styles from "./filter.module.css";
import {CalTime} from "../reusable/CalTime"

const Filter = () => {
    const [tweets, setTweets] = useState([
        /*{
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
        },*/
    ]);
    useEffect(() => {
        const fetchall = async () => {
            const not_login = await fetch("/FetchAllTweet", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const not_log_json = await not_login.json();
            console.log(not_log_json.message)
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
                    dur: CalTime(not_log_json.message[i].CreateTime)[1],
                    date: CalTime(not_log_json.message[i].CreateTime)[0],
                    likeCount: not_log_json.message[i].LikeCount,
                    commentCount: not_log_json.message[i].CommentCount,
                    retweetCount: not_log_json.message[i].ReTweetCount,
                    viewCount: 1000,
                });
            }
            setTweets(new_tw);
            
        }
        fetchall();
    }, []);
    return (
        <Tabs tabNames={["Popular", "Recent"]}>
            <div className={styles.con}>
                {tweets.sort((a,b)=>b.likeCount-a.likeCount).map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
            <div className={styles.con}>
                {tweets.sort((a,b)=>a.dur-b.dur).map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
        </Tabs>
    );
};
export default Filter;
