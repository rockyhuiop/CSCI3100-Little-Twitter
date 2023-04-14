import { useEffect, useState } from "react";
import defaultUser from "../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../utils/constants";
import { distance } from "../../utils/distance";
import CenteredStatus from "../reusable/CenteredStatus";
import Tabs from "../reusable/Tabs";
import People from "../tweet/People";
import Tweet from "../tweet/Tweet";
import styles from "./filter.module.css";
import {CalTime} from "../../utils/CalTime"

const Filter = (search, data) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [tweetsPop, setTweetsPop] = useState([]);
    const [tweetsRec, setTweetsRec] = useState([]);
    const [ppl, setPpl] = useState([]);

    useEffect(() => {
        const fetchall = async (search) => {
            setIsLoading(true);
            const new_tw = [];
            const check_log = await fetch("/home");
            if (!check_log.ok) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
            if (!search.search) {
                if (!check_log.ok) {
                    setIsLoggedIn(false);
                    const not_login = await fetch("/FetchAllTweet");
                    const not_log_json = await not_login.json();
                    console.log(not_log_json);
                    //const new_tw = [];
                    for (let i = 0; i < not_log_json.message.length; i++) {
                        new_tw.push({
                            tweetId: not_log_json.message[i].TweetID,
                            text: not_log_json.message[i].Content,
                            user: {
                                userId: not_log_json.message[i].CreatorUserID,
                                name: not_log_json.message[i].CreatorUserName,
                                profile_image_url: not_log_json.message[i].CreatorAvastar
                                    ? SERVER_ADDRESS +
                                    not_log_json.message[i].CreatorAvastar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: CalTime(not_log_json.message[i].CreateTime)[1],
                            date: distance(not_log_json.message[i].CreateTime),
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
                    const login = await fetch("/home/TweetRecommend");
                    const log_json = await login.json();
                    //const new_tw = [];
                    for (let i = 0; i < log_json.message.length; i++) {
                        console.log(distance(log_json.message[i].CreateTime))
                        new_tw.push({
                            tweetId: log_json.message[i].TweetID,
                            text: log_json.message[i].Content,
                            user: {
                                userId: log_json.message[i].CreatorUserID,
                                name: log_json.message[i].CreatorUserName,
                                profile_image_url: log_json.message[i].CreatorAvastar
                                    ? SERVER_ADDRESS +
                                    log_json.message[i].CreatorAvastar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: CalTime(log_json.message[i].CreateTime)[1],
                            date: distance(log_json.message[i].CreateTime),
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
                    "/search/SearchUserById/" + search.content
                );
                const ppl_json = await ppl.json();
                console.log(ppl_json.data);
                const new_ppl = [];
                for (let i = 0; i < ppl_json.data.length; i++) {
                    new_ppl.push({
                        userId: ppl_json.data[i].tweetID,
                        name: ppl_json.data[i].name,
                        followers: ppl_json.data[i].followers,
                        profile_image_url: ppl_json.data[i].avatar
                            ? SERVER_ADDRESS +
                              ppl_json.data[i].avatar.replace("\\", "/")
                            : defaultUser,
                    });
                    setPpl(new_ppl);
                }

                for (let i = 0; i < search.data.length; i++) {
                    new_tw.push({
                        tweetId: search.data[i].TweetID,
                        text: search.data[i].Content,
                        user: {
                            userId: search.data[i].CreatorUserID,
                            name: search.data[i].CreatorUserName,
                            profile_image_url: search.data[i].CreatorAvastar
                                ? SERVER_ADDRESS +
                                search.data[i].CreatorAvastar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        dur: CalTime(search.data[i].CreateTime)[1],
                        date: distance(search.data[i].CreateTime),
                        likeCount: search.data[i].LikeCount,
                        commentCount: search.data[i].CommentCount,
                        retweetCount: search.data[i].ReTweetCount,
                        imageList: search.data[i].ImageList,
                        viewCount: 1000,
                    });
                    setTweets([...new_tw]);
                }
            }
            const new_tw_pop = [...new_tw].sort((a, b) => b.likeCount - a.likeCount);
            const new_tw_rec = [...new_tw].sort((a, b) => a.dur - b.dur);
            setTweetsPop(new_tw_pop);
            setTweetsRec(new_tw_rec);
            setIsLoading(false);
        };
        fetchall(search, data);
    }, [search]);
    return (
        <>
        { isLoggedIn ?
            <Tabs
                tabNames={["Recommend", "Popular", "Recent", "People"]}
            >
                <div className={styles.con}>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
                    ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>

                <div className={styles.con}>
                    {tweetsPop.map((tweet) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
                    ))}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>
                <div className={styles.con}>
                    {tweetsRec.map((tweet) => (
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
        :
            <Tabs
            tabNames={["Popular", "Recent"]}
            >

            <div className={styles.con}>
                {tweetsPop.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
                {isLoading ? (
                    <CenteredStatus>{"Loading..."}</CenteredStatus>
                ) : (
                    " "
                )}
            </div>
            <div className={styles.con}>
                {tweetsRec.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
                {isLoading ? (
                    <CenteredStatus>{"Loading..."}</CenteredStatus>
                ) : (
                    " "
                )}
            </div>

            </Tabs>
        }
        </>
    );
};
export default Filter;
