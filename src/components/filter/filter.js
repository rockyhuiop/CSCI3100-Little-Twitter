import { useState, useEffect } from "react";
import Tabs from "../reusable/Tabs";
import Tweet from "../tweet/Tweet";
import People from "../tweet/People";
import styles from "./filter.module.css";
import { CalTime } from "../reusable/CalTime";
import { SERVER_ADDRESS } from "../../utils/constants";
import defaultUser from "../../assets/default.jpg";
import CenteredStatus from "../reusable/CenteredStatus";

const Filter = (search, data) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    const [tweetsPop, setTweetsPop] = useState([]);
    const [tweetsRec, setTweetsRec] = useState([]);
    const [ppl, setPpl] = useState([]);

    useEffect(() => {
        const fetchall = async (search) => {
            setIsLoading(true);
            const new_tw = [];
            const check_log = await fetch("/home", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (!check_log.ok){
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
            if (!search.search) {
                if (!check_log.ok) {
                    setIsLoggedIn(false);
                    const not_login = await fetch("/FetchAllTweet", {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    });
                    const not_log_json = await not_login.json();
                    //const new_tw = [];
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
                                      creator_json.data[0].avatar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: CalTime(not_log_json.message[i].CreateTime)[1],
                            date: CalTime(
                                not_log_json.message[i].CreateTime
                            )[0],
                            likeCount: not_log_json.message[i].LikeCount,
                            commentCount: not_log_json.message[i].CommentCount,
                            retweetCount: not_log_json.message[i].ReTweetCount,
                            imageList: not_log_json.message[i].ImageList,
                            viewCount: 1000,
                        });
                        setTweets([...new_tw]);
                    }
                    //setTweets(new_tw);
                } else if (check_log.ok) {
                    setIsLoggedIn(true);
                    const login = await fetch("/home/TweetRecommend", {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    });
                    const log_json = await login.json();
                    //const new_tw = [];
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
                                      creator_json.data[0].avatar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: CalTime(log_json.message[i].CreateTime)[1],
                            date: CalTime(log_json.message[i].CreateTime)[0],
                            likeCount: log_json.message[i].LikeCount,
                            commentCount: log_json.message[i].CommentCount,
                            retweetCount: log_json.message[i].ReTweetCount,
                            imageList: log_json.message[i].ImageList,
                            viewCount: 1000,
                        });
                        setTweets([...new_tw]);
                    }

                    //setTweets(new_tw);
                }
            } else {
                const ppl = await fetch(
                    "/search/SearchUserById/" +
                        search.content,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    }
                );
                const ppl_json = await ppl.json();
                const new_ppl=[];
                for (var i=0;i<ppl_json.data.length;i++){
                    new_ppl.push({
                        userId: ppl_json.data[i].tweetID,
                        name: ppl_json.data[i].name,
                        followers: ppl_json.data[i].followers, 
                        profile_image_url:
                        ppl_json.data[i].avatar
                            ? SERVER_ADDRESS +
                            ppl_json.data[i].avatar.replace(
                                "\\",
                                "/"
                            )
                            : defaultUser,
                    });
                    setPpl([...new_ppl]);
                }
                
                for (var i = 0; i < search.data.length; i++) {
                    const creator = await fetch(
                        "/search/SearchUserById/" +
                            search.data[i].CreatorUserID,
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
                        tweetId: search.data[i].TweetID,
                        text: search.data[i].Content,
                        user: {
                            userId: search.data[i].CreatorUserID,
                            name: search.data[i].CreatorUserName,
                            profile_image_url:
                            creator_json.data[0].avatar
                                ? SERVER_ADDRESS +
                                creator_json.data[0].avatar.replace(
                                    "\\",
                                    "/"
                                )
                                : defaultUser,
                        },
                        media: "",
                        dur: CalTime(search.data[i].CreateTime)[1],
                        date: CalTime(search.data[i].CreateTime)[0],
                        likeCount: search.data[i].LikeCount,
                        commentCount: search.data[i].CommentCount,
                        retweetCount: search.data[i].ReTweetCount,
                        imageList: search.data[i].ImageList,
                        viewCount: 1000,
                    });
                    setTweets([...new_tw]);
                }

                //setTweets(new_tw);
            }
            const new_tw_pop = [...new_tw].sort(
                (a, b) => b.likeCount - a.likeCount
            );
            const new_tw_rec = [...new_tw].sort((a, b) => a.dur - b.dur);
            setTweetsPop(new_tw_pop);
            setTweetsRec(new_tw_rec);
            setIsLoading(false);
        };
        fetchall(search, data);
    }, [search]);
    return (
        <>
            <Tabs
                tabNames={
                    isLoggedIn
                        ? ["Recommend", "Popular", "Recent", "People"]
                        : ["Popular", "Recent", "People"]
                }
            >

                <div className={styles.con}>
                    {tweets
                        //.sort((a, b) => b.likeCount - a.likeCount)
                        .map((tweet) => (
                            <Tweet key={tweet.tweetId} tweet={tweet} />
                        ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>


                    
                <div className={styles.con}>
                    {tweetsPop
                        //.sort((a, b) => b.likeCount - a.likeCount)
                        .map((tweet) => (
                            <Tweet key={tweet.tweetId} tweet={tweet} />
                        ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>
                <div className={styles.con}>
                    {tweetsRec
                        //.sort((a, b) => a.dur - b.dur)
                        .map((tweet) => (
                            <Tweet key={tweet.tweetId} tweet={tweet} />
                        ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>
                <div className={styles.con}>
                    {ppl
                        //.sort((a, b) => a.dur - b.dur)
                        .map((ppl) => (
                            <People key={ppl.userId} tweet={ppl} />
                        ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>

            </Tabs>
        </>
    );
};
export default Filter;
