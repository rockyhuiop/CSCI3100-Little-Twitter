import Search from "../search/search";
import TweetDetails from "./TweetDetail";
import "./TweetInfo.css";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddTweetReuse from "../reusable/AddTweetReuse";
import { useState } from "react";
import Tweet from "./Tweet";

const TweetInfo = ({ tweet }) => {
    let navigate = useNavigate();
    const msg = "Tweet your reply";
    const btn = "Reply";

    const [comments, setComments] = useState([
        {
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
        },
    ]);

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
                <TweetDetails tweet={tweet} />
                <AddTweetReuse msg={msg} btn={btn} />
                {comments.map((tweet) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </div>
            <div className="searchBar">
                <Search />
            </div>
        </div>
    );
};

export default TweetInfo;
