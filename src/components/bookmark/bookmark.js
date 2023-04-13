import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tweet from "../tweet/Tweet";
import styles from "./bookmark.module.css";
import { useUser } from "../../utils/UserContext";
import { CalTime } from "../reusable/CalTime";
import { SERVER_ADDRESS } from "../../utils/constants";
import defaultUser from "../../assets/default.jpg";
import CenteredStatus from "../reusable/CenteredStatus";
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
            const check_log = await fetch("/home", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (!check_log.ok) {
                nav("/", { replace: true });
            } else if (check_log.ok) {
                const new_tw = [];
                for (var j = 0; j < currentUser.bookmark.length; j++) {
                    const bookmark = await fetch(
                        "/home/FetchTweet/" + currentUser.bookmark[j],
                        {
                            method: "GET",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                        }
                    );
                    const bookmark_json = await bookmark.json();
                    const creator = await fetch(
                        "/search/SearchUserById/"+bookmark_json.message[0].CreatorUserID,
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
                        tweetId: bookmark_json.message[0].TweetID,
                        text: bookmark_json.message[0].Content,
                        user: {
                            userId: bookmark_json.message[0].CreatorUserID,
                            name: bookmark_json.message[0].CreatorUserName,
                            profile_image_url:
                                creator_json.data[0].avatar ? SERVER_ADDRESS+creator_json.data[0].avatar.replace("\\","/") : defaultUser,
                        },
                        media: "",
                        date: CalTime(bookmark_json.message[0].CreateTime)[0],
                        likeCount: bookmark_json.message[0].LikeCount,
                        commentCount: bookmark_json.message[0].Comment.length,
                        retweetCount: bookmark_json.message[0].ReTweetCount,
                        imageList: bookmark_json.message[0].ImageList,
                        viewCount: 1000,
                    });
                    setTweets(new_tw);
                }
                //setTweets(new_tw);
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
