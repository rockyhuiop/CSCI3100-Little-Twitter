import { useEffect, useState } from "react";
import defaultUser from "../../assets/default.jpg";
import { BACK_SER, SERVER_ADDRESS } from "../../utils/constants";
import { distance } from "../../utils/distance";
import CenteredStatus from "../reusable/CenteredStatus";
import Tabs from "../reusable/Tabs";
import People from "../tweet/People";
import Tweet from "../tweet/Tweet";
import styles from "./filter.module.css";
import { differenceInBusinessDays, differenceInSeconds } from "date-fns";

const Filter = (search, data) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);    //to store if the user is logged in
    const [isLoading, setIsLoading] = useState(false);      //to store if the page is loading
    const [tweets, setTweets] = useState([]);               //tweet list to be shown, order by recommend
    const [tweetsPop, setTweetsPop] = useState([]);         //tweet list to be shown, order by popular
    const [tweetsRec, setTweetsRec] = useState([]);         //tweet list to be shown, order by recent
    const [ppl, setPpl] = useState([]);                     //people list to be shown (for the tab people)

    useEffect(() => {
        /* a function to fetch all required information in search page*/
        /* search parameter store if the user searched something */
        const fetchall = async (search) => {
            setIsLoading(true);                         //initially is loading, set to true
            const new_tw = [];                          //a temp array to store the tweet
            const check_log = await fetch(BACK_SER+"/home",{
                method: "GET",
                credentials: "include",
            });     //to check if user is logged in
            if (!check_log.ok) {
                setIsLoggedIn(false);                   //set user is not logged in
            } else {
                setIsLoggedIn(true);                    //set user logged in
            }
            if (!search.search) {                       //user did not search
                if (!check_log.ok) {                    //user is not logged in
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
                                profile_image_url: not_log_json.message[i].CreatorAvastar
                                    ? SERVER_ADDRESS +
                                    not_log_json.message[i].CreatorAvastar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: differenceInSeconds(new Date(not_log_json.message[i].CreateTime), new Date()), //use for sort the tweet by time
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
                } else if (check_log.ok) {                              //if user is logged in
                    setIsLoggedIn(true);
                    /* fetch recommend tweet */
                    const login = await fetch(BACK_SER+"/home/TweetRecommend",{
                        method: "GET",
                        credentials: "include",
                    });
                    const log_json = await login.json();
                    /* fetch recommend people */
                    const ppl = await fetch(BACK_SER+
                        "/search/UserRecommendation",
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );
                    const ppl_json = await ppl.json();
                    const new_ppl = [];         //a temp array to store the people
                    /* push the content of the fetched people into new_ppl */
                    for (let i = 0; i < ppl_json.User_Recommend.length; i++) {
                        new_ppl.push({
                            userId: ppl_json.User_Recommend[i].tweetID,
                            name: ppl_json.User_Recommend[i].name,
                            followers: ppl_json.User_Recommend[i].followers,
                            /* do some adjustment to the profile image path */
                            /* use default image path if user's profile image not found */
                            profile_image_url: ppl_json.User_Recommend[i].avatar
                                ? SERVER_ADDRESS +
                                ppl_json.User_Recommend[i].avatar.replace("\\", "/")
                                : defaultUser,
                        });
                        /* put the people fetched into the people list to be shown */
                        setPpl(new_ppl);
                    }
                    /* push the content of the fetched tweet into new_tw */
                    for (let i = 0; i < log_json.message.length; i++) {
                        new_tw.push({
                            tweetId: log_json.message[i].TweetID,
                            text: log_json.message[i].Content,
                            user: {
                                userId: log_json.message[i].CreatorUserID,
                                name: log_json.message[i].CreatorUserName,
                                /* do some adjustment to the profile image path */
                                /* use default image path if user's profile image not found */  
                                profile_image_url: log_json.message[i].CreatorAvastar
                                    ? SERVER_ADDRESS +
                                    log_json.message[i].CreatorAvastar.replace(
                                          "\\",
                                          "/"
                                      )
                                    : defaultUser,
                            },
                            media: "",
                            dur: differenceInSeconds(new Date(log_json.message[i].CreateTime), new Date()), //use for sort the tweet by time
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
                }
            } else {                                                //user have searched something
                /* fetch user mathch user's search */
                const ppl = await fetch(BACK_SER+
                    "/search/SearchUserById/" + search.content,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const ppl_json = await ppl.json();
                const new_ppl = [];                                 //a temp array to store the people
                /* push the content of the fetched people into new_ppl */
                for (let i = 0; i < ppl_json.data.length; i++) {
                    new_ppl.push({
                        userId: ppl_json.data[i].tweetID,
                        name: ppl_json.data[i].name,
                        followers: ppl_json.data[i].followers,
                        /* do some adjustment to the profile image path */
                        /* use default image path if user's profile image not found */
                        profile_image_url: ppl_json.data[i].avatar
                            ? SERVER_ADDRESS +
                              ppl_json.data[i].avatar.replace("\\", "/")
                            : defaultUser,
                    });
                    /* put the people fetched into the people list to be shown */
                    setPpl(new_ppl);
                }
                /* push the content of the fetched tweet into new_tw */
                for (let i = 0; i < search.data.length; i++) {
                    new_tw.push({
                        tweetId: search.data[i].TweetID,
                        text: search.data[i].Content,
                        user: {
                            userId: search.data[i].CreatorUserID,
                            name: search.data[i].CreatorUserName,
                            /* do some adjustment to the profile image path */
                            /* use default image path if user's profile image not found */
                            profile_image_url: search.data[i].CreatorAvastar
                                ? SERVER_ADDRESS +
                                search.data[i].CreatorAvastar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        dur: differenceInSeconds(new Date(search.data[i].CreateTime), new Date()),  //use for sort the tweet by time
                        date: distance(search.data[i].CreateTime),
                        likeCount: search.data[i].LikeCount,
                        commentCount: search.data[i].CommentCount,
                        retweetCount: search.data[i].ReTweetCount,
                        imageList: search.data[i].ImageList,
                        viewCount: 1000,
                    });
                    /* put the tweet fetched into the tweet list to be shown */
                    setTweets([...new_tw]);
                }
            }
            /* sort the tweet list */
            const new_tw_pop = [...new_tw].sort((a, b) => b.likeCount - a.likeCount); //sort by popular
            const new_tw_rec = [...new_tw].sort((a, b) => b.dur - a.dur);             //sort by time
            /* put the tweet sorted into the corrsponding tweet list to be shown */
            setTweetsPop(new_tw_pop);
            setTweetsRec(new_tw_rec);
            setIsLoading(false);        //finish loading
        };
        fetchall(search, data); //run the above function
    }, [search]);               //run again if the user changed the serach result (including empty search)
    return (
        <>
        {/* if logged in, 4 tab: "Recommend", "Popular", "Recent", "People" 
            if not, 2 tab: "Popular", "Recent"
        */}
        { isLoggedIn ?  //logged in
            <Tabs
                tabNames={["Recommend", "Popular", "Recent", "People"]}
            >
                {/* show tweet list in recommend order */}
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
                {/* show tweet list in popular order */}
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
                {/* show tweet list in time order */}
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
                {/* show people list */}
                <div className={styles.con}>
                    {ppl
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
        :   /* not logged in */
            <div className={styles.notLog}>
                <Tabs
                tabNames={["Popular", "Recent"]}
                >
                {/* show tweet list in popular order */}
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
                {/* show tweet list in time order */}
                <div className={styles.con}>
                    {tweetsRec.map((tweet) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
                    ))}
                    {/* display loading screen if still loading */}
                    {isLoading ? (
                        <CenteredStatus>{"Loading..."}</CenteredStatus>
                    ) : (
                        " "
                    )}
                </div>
                    
                </Tabs>
            </div>
        }
        </>
    );
};
export default Filter;
