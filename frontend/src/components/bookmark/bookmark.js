import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../utils/constants";
import { distance } from "../../utils/distance";
import { useUser } from "../../utils/UserContext";
import CenteredStatus from "../reusable/CenteredStatus";
import Tweet from "../tweet/Tweet";
import styles from "./bookmark.module.css";

const Bookmark = () => {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);  //to store if the page is loading
    const { user: currentUser } = useUser();            //user basic information
    const [tweets, setTweets] = useState([              //tweet list to be shown (bookmark)
    ]);
    useEffect(() => {
        /* a function to fetch the bookmark of the user */
        const fetchBookmark = async () => {
            setIsLoading(true);                                 //initially is loading, set to true
            const check_log = await fetch("/home");             //to check if user is logged in
            if (!check_log.ok) {
                nav("/", { replace: true });                    //force user go back to homepage if not logged in
            } else if (check_log.ok) {
                const new_tw = [];  //a temp array to store the tweet (bookmark)
                /* fetch the bookmark 1 by 1 using the tweetID (currentUser.bookmark) in user bookmark list */
                for (let j = 0; j < currentUser.bookmark.length; j++) {
                    const bookmark = await fetch(
                        "/home/FetchTweet/" + currentUser.bookmark[j]
                    );
                    const bookmark_json = await bookmark.json();
                    /* push the content of bookmark fetced into new_tw */
                    new_tw.push({
                        tweetId: bookmark_json.message[0].TweetID,
                        text: bookmark_json.message[0].Content,
                        user: {
                            userId: bookmark_json.message[0].CreatorUserID,
                            name: bookmark_json.message[0].CreatorUserName,
                            /* do some adjustment to the profile image path */
                            /* use default image path if user's profile image not found */
                            profile_image_url: bookmark_json.message[0].CreatorAvastar
                                ? SERVER_ADDRESS +
                                bookmark_json.message[0].CreatorAvastar.replace("\\", "/")
                                : defaultUser,
                        },
                        media: "",
                        date: distance(bookmark_json.message[0].CreateTime),
                        likeCount: bookmark_json.message[0].LikeCount,
                        commentCount: bookmark_json.message[0].Comment.length,
                        retweetCount: bookmark_json.message[0].ReTweetCount,
                        imageList: bookmark_json.message[0].ImageList,
                        viewCount: 1000,
                    });
                    
                }
                /* put the tweet fetched into the tweet list to be shown */
                setTweets(new_tw);
            }
            setIsLoading(false);    //finish loading, set to false
        };
        fetchBookmark();            //run the function above
        /* run the function again when user basic information changed (for bookmark list) */
    }, [currentUser]);

    return (
        <>
            <div className={styles.title}>Bookmarks</div>
            {/* call the Tweet to show the bookmark 1 by 1 */}
            {tweets.map((tweet) => (
                <Tweet key={tweet.tweetId} tweet={tweet} />
            ))}
            {/* display loading screen if still loading */}
            {isLoading ? <CenteredStatus>{"Loading..."}</CenteredStatus> : " "}
        </>
    );
};
export default Bookmark;
