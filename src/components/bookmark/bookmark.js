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
    const [isLoading, setIsLoading] = useState(false);
    const { user: currentUser } = useUser();
    const [tweets, setTweets] = useState([
        /*{
            tweetId: 1,
            text: "Hello, Twitter!",
            user: {
                name: "John Doe",
                screen_name: "john_doe",
                profile_image_url: "https://example.com/john_doe.jpg",
            },
        },*/
    ]);
    useEffect(() => {
        const fetchBookmark = async () => {
            setIsLoading(true);
            const check_log = await fetch("/home");
            if (!check_log.ok) {
                nav("/", { replace: true });
            } else if (check_log.ok) {
                const new_tw = [];
                for (let j = 0; j < currentUser.bookmark.length; j++) {
                    const bookmark = await fetch(
                        "/home/FetchTweet/" + currentUser.bookmark[j]
                    );
                    const bookmark_json = await bookmark.json();
                    new_tw.push({
                        tweetId: bookmark_json.message[0].TweetID,
                        text: bookmark_json.message[0].Content,
                        user: {
                            userId: bookmark_json.message[0].CreatorUserID,
                            name: bookmark_json.message[0].CreatorUserName,
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
                setTweets(new_tw);
            }
            setIsLoading(false);
        };
        fetchBookmark();
    }, [currentUser]);

    return (
        <>
            <div className={styles.title}>Bookmarks</div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.tweetId} tweet={tweet} />
            ))}
            {isLoading ? <CenteredStatus>{"Loading..."}</CenteredStatus> : " "}
        </>
    );
};
export default Bookmark;
