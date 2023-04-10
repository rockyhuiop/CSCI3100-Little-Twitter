import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import {
    faComment,
    faHeart,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { useUser } from "../../utils/UserContext";
import { useModal } from "../reusable/modal/useModal";
import NavAddTweet from "../navbar/NavAddTweet";

//import "./Tweet.css";

const TweetActions = ({ tweetStatistic, tweet }) => {
    const [likes, setLikes] = useState(tweetStatistic.likeCount);
    const [isLiked, setIsLiked] = useState(false);
    const [retweets, setRetweets] = useState(tweetStatistic.retweetCount);
    const { isShowing, onClose, onOpen } = useModal();
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return null;
    }

    const handleLike = (e) => {
        e.preventDefault();
        if (!isLiked) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
        setIsLiked(!isLiked);
    };

    const handleRetweet = (e) => {
        e.preventDefault();
        setRetweets(retweets + 1);
    };

    const handleComment = (e) => {
        e.preventDefault();
        onOpen();
    };

    const handleShare = (e) => {
        e.preventDefault();
    };

    return (
        <div className="tweet__actions">
            <div className="tweet__action primary">
                <IconButton size="small" onClick={handleComment}>
                    <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <NavAddTweet
                    isShowing={isShowing}
                    onClose={onClose}
                    tweet={tweet}
                    isReply={true}
                />
                <span>{tweetStatistic.commentCount}</span>
            </div>
            <div className="tweet__action retweet">
                <IconButton size="small" onClick={handleRetweet}>
                    <FontAwesomeIcon icon={faRetweet} />
                </IconButton>
                <span>{retweets}</span>
            </div>
            <div className="tweet__action like">
                <IconButton size="small" onClick={handleLike}>
                    <FontAwesomeIcon icon={faHeart} />
                </IconButton>
                <span>{likes}</span>
            </div>
            <div className="tweet__action primary">
                <IconButton size="small" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShareFromSquare} />
                </IconButton>
            </div>
        </div>
    );
};

export default TweetActions;
