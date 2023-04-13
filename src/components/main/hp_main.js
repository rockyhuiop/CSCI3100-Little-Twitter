import { useEffect, useState } from "react";
import AddTweet from "../reusable/AddTweet";
import Search from "../search/search";
import Tweet from "../tweet/Tweet";
import styles from "./hp_main.module.css";
import { CalTime } from "../reusable/CalTime";
import { SERVER_ADDRESS } from "../../utils/constants";
import defaultUser from "../../assets/default.jpg";
import CenteredStatus from "../reusable/CenteredStatus";

const Hp_main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        const fetchHome = async () => {
            setIsLoading(true);
            const new_tw = [];
            const check_log = await fetch("/home", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (check_log.ok) {
                setIsLoggedIn(true);

                const login = await fetch("/home/fetchHomeTweet", {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                    },
                });
                const log_json = await login.json();
                for (var i = 0; i < log_json.message.length; i++) {
                    const creator = await fetch(
                        "/search/SearchUserById/" +
                            log_json.message[i].CreatorUserID,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                        }
                    );
                    const creator_json = await creator.json();
                    new_tw.push({
                        tweetId: log_json.message[i].TweetID,
                        text: log_json.message[i].Content,
                        user: {
                            userId: log_json.message[i].CreatorUserID,
                            name: log_json.message[i].CreatorUserName,
                            profile_image_url: creator_json.data[0].avatar
                                ? SERVER_ADDRESS +
                                  creator_json.data[0].avatar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        date: CalTime(log_json.message[i].CreateTime)[0],
                        likeCount: log_json.message[i].LikeCount,
                        commentCount: log_json.message[i].CommentCount,
                        retweetCount: log_json.message[i].ReTweetCount,
                        imageList: log_json.message[i].ImageList,
                        viewCount: 1000,
                    });
                    setTweets([...new_tw]);
                }
                setTweets(new_tw);
            } else {
                setIsLoggedIn(false);
                const not_login = await fetch("/FetchAllTweet", {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8",
                    },
                });
                const not_log_json = await not_login.json();
                for (var i = 0; i < not_log_json.message.length; i++) {
                    const creator = await fetch(
                        "/search/SearchUserById/" +
                            not_log_json.message[i].CreatorUserID,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                        }
                    );
                    const creator_json = await creator.json();
                    new_tw.push({
                        tweetId: not_log_json.message[i].TweetID,
                        text: not_log_json.message[i].Content,
                        user: {
                            userId: not_log_json.message[i].CreatorUserID,
                            name: not_log_json.message[i].CreatorUserName,
                            profile_image_url: creator_json.data[0].avatar
                                ? SERVER_ADDRESS +
                                  creator_json.data[0].avatar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        date: CalTime(not_log_json.message[i].CreateTime)[0],
                        likeCount: not_log_json.message[i].LikeCount,
                        commentCount: not_log_json.message[i].CommentCount,
                        retweetCount: not_log_json.message[i].ReTweetCount,
                        imageList: not_log_json.message[i].ImageList,
                        viewCount: 1000,
                    });
                    setTweets([...new_tw]);
                }
                //setTweets(new_tw);
            }

            setIsLoading(false);
        };
        fetchHome();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>Home</h3>
                </div>
                {isLoading ? (
                    ""
                ) : isLoggedIn ? (
                    <AddTweet msg={msg} btn={btn} />
                ) : null}
                {tweets.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
                {isLoading ? (
                    <CenteredStatus>{"Loading..."}</CenteredStatus>
                ) : (
                    ""
                )}
            </div>
            <div className={styles.searchBar}>
                <Search />
            </div>
        </div>
    );
};
export default Hp_main;
