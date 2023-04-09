import { useState, useEffect } from "react";
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
    const tw_pop=[]
    const tw_rec=[]
    useEffect(() => {
        const fetchall = async () => {
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
            console.log(not_log_json.message)
            setTweets(new_tw);
            tw_pop=tweets.sort((a,b)=>b.viewCount-a.viewCount);
            tw_rec=tweets.sort((a,b)=>b.date-a.date);
        }
        fetchall();
    }, []);
    return (
        <Tabs tabNames={["Popular", "Recent"]}>
            <div className={styles.con}>
                {tw_pop.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
            <div className={styles.con}>
                {tw_rec.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
        </Tabs>
    );
};
export default Filter;
