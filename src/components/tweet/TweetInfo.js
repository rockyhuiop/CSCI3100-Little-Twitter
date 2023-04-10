import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddTweet from "../reusable/AddTweet";
import Search from "../search/search";
import Tweet from "./Tweet";
import TweetDetails from "./TweetDetail";
import "./TweetInfo.css";

const TweetInfo = ({ tweet, isComment }) => {
    let navigate = useNavigate();
    const msg = "Tweet your reply";
    const btn = "Reply";

    const [comments, setComments] = useState([
        {
            commentId: "1",
            rootTweet: {
                tweetId: "1",
                text: "root here!",
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
            in_reply_to_tweetId: tweet.tweetId,
            in_reply_to_userId: tweet.user.userId,
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
            commentId: "2",
            rootTweet: {
                tweetId: "1",
                text: "root here!",
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
            in_reply_to_tweetId: tweet.tweetId,
            in_reply_to_userId: tweet.user.userId,
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
        },
    ]);
    const [in_reply_to_tweet, setIn_reply_to_tweet] = useState({
        commentId: "1",
        in_reply_to_tweetId: tweet.tweetId,
        in_reply_to_userId: tweet.user.userId,
        text: "reply you",
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
    });

    return (
        <div className="container">
            <div className="content">
                <div className="header">
                    <div className="tweet__action">
                        <IconButton
                            size="small"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <FontAwesomeIcon size="sm" icon={faArrowLeft} />
                        </IconButton>
                    </div>
                    <h3>Tweet</h3>
                </div>
                {isComment ? <Tweet tweet={tweet.rootTweet} type="root" /> : ""}
                <TweetDetails
                    tweet={tweet}
                    type={isComment ? "comment" : "regular"}
                />
                <AddTweet msg={msg} btn={btn} />
                {comments.map((tweet) => (
                    <Tweet
                        key={tweet.commentId}
                        tweet={tweet}
                        type={"comment"}
                    />
                ))}
            </div>
            <div className="searchBar">
                <Search />
            </div>
        </div>
    );
};

export default TweetInfo;
