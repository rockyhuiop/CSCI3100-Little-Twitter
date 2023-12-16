import { useEffect, useState } from "react";
import defaultUser from "../../assets/default.jpg";
import { BACK_SER, SERVER_ADDRESS } from "../../utils/constants";
import { distance } from "../../utils/distance";
import AddTweet from "../reusable/AddTweet";
import CenteredStatus from "../reusable/CenteredStatus";
import Search from "../search/search";
import Tweet from "../tweet/Tweet";
import styles from "./hp_main.module.css";

const Hp_main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);    //to store if the user is logged in
    const [isLoading, setIsLoading] = useState(false);      //to store if the page is loading
    const [tweets, setTweets] = useState([                  //tweet list to be shown (bookmark)
    ]);

    const msg = "What's happening?";    //add tweet text area place holder
    const btn = "Tweet";                //add tweet button text display

    useEffect(() => {
        /* a function to fetch all the tweet to be shown in homepage */
        const fetchHome = async () => {
            setIsLoading(true);                         //initially is loading, set to true
            const new_tw = [];                          //a temp array to store the tweet
            const check_log = await fetch(BACK_SER+"/home",{
                method: "GET",
                credentials: "include",
            });     //to check if user is logged in
            if (check_log.ok) {                         //logged in 
                setIsLoggedIn(true);
                /* fetch the recommend tweet */
                const login = await fetch(BACK_SER+"/home/fetchHomeTweet",{
                    method: "GET",
                    credentials: "include",
                });
                const log_json = await login.json();
                /* push the content of the fetched tweet into new_tw */
                //console.log(log_json)
                for (let i = 0; i < log_json.message.length; i++) {
                    new_tw.push({
                        tweetId: log_json.message[i].TweetID,
                        text: log_json.message[i].Content,
                        user: {
                            userId: log_json.message[i].CreatorUserID,
                            name: log_json.message[i].CreatorUserName,
                            /* do some adjustment to the profile image path */
                            /* use default image path if user's profile image not found */
                            profile_image_url: log_json.message[i]
                                .CreatorAvastar
                                ? SERVER_ADDRESS +
                                  log_json.message[i].CreatorAvastar.replace(
                                      "\\",
                                      "/"
                                  )
                                : defaultUser,
                        },
                        media: "",
                        retweet: log_json.message[i].ReTweet,
                        date: distance(log_json.message[i].CreateTime),
                        likeCount: log_json.message[i].LikeCount,
                        commentCount: log_json.message[i].CommentCount,
                        retweetCount: log_json.message[i].ReTweetCount,
                        imageList: log_json.message[i].ImageList,
                        viewCount: 1000,
                    });
                    /* put the tweet fetched into the tweet list to be shown */
                    setTweets([...new_tw]);
                }
                /* put the tweet fetched into the tweet list to be shown */
                setTweets(new_tw);
            } else {    //not logged in
                setIsLoggedIn(false);
                /* fetch all the tweet */
                const not_login = await fetch(BACK_SER+"/FetchAllTweet",{
                    method: "GET",
                    credentials: "include",
                });
                const not_log_json = await not_login.json();
                /* push the content of the fetched tweet into new_tw */
                for (let i = 0; i < not_log_json.message.length; i++) {
                    new_tw.push({
                        tweetId: not_log_json.message[i].TweetID,
                        text: not_log_json.message[i].Content,
                        user: {
                            userId: not_log_json.message[i].CreatorUserID,
                            name: not_log_json.message[i].CreatorUserName,
                            /* do some adjustment to the profile image path */
                            /* use default image path if user's profile image not found */
                            profile_image_url: not_log_json.message[i]
                                .CreatorAvastar
                                ? SERVER_ADDRESS +
                                  not_log_json.message[
                                      i
                                  ].CreatorAvastar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        retweet: not_log_json.message[i].ReTweet,
                        date: distance(not_log_json.message[i].CreateTime),
                        likeCount: not_log_json.message[i].LikeCount,
                        commentCount: not_log_json.message[i].CommentCount,
                        retweetCount: not_log_json.message[i].ReTweetCount,
                        imageList: not_log_json.message[i].ImageList,
                        viewCount: 1000,
                    });
                    /* put the tweet fetched into the tweet list to be shown */
                    setTweets([...new_tw]);
                }
            }
            setIsLoading(false);    //finish loading
        };
        fetchHome();    //run the above function
    }, []);             //only run once

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>Home</h3>
                </div>
                {/* hide the addtweet button if user is not logged in */}
                {isLoading ? (
                    ""
                ) : isLoggedIn ? (
                    <AddTweet msg={msg} btn={btn} />
                ) : null}
                {/* show all the tweet */}
                <div className={isLoggedIn ? "" : styles.notLog}>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
                    ))}
                </div>
                {/* display loading screen if still loading */}
                {isLoading ? (
                    <CenteredStatus>{"Loading..."}</CenteredStatus>
                ) : (
                    ""
                )}
            </div>
            {/* search box */}
            <div className={styles.searchBar}>
                <Search />
            </div>
        </div>
    );
};
export default Hp_main;
