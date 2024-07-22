import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import {
    faComment,
    faHeart,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext";
import { useModal } from "../reusable/modal/useModal";
import NavAddTweet from "../navbar/NavAddTweet";

//import "./Tweet.css";

const TweetActions = ({ tweetStatistic, tweet, isComment }) => {
    const { isLoggedIn, user: currentUser } = useUser();
    const [likes, setLikes] = useState(tweetStatistic.likeCount);
    const [isLiked, setIsLiked] = useState(
        isLoggedIn
            ? isComment
                ? currentUser.likedCommentID.includes(tweet.tweetId)
                : currentUser.likedTweetID.includes(tweet.tweetId)
            : false
    );
    const [retweets, setRetweets] = useState(tweetStatistic.retweetCount);
    const [isRetweeted, setIsRetweeted] = useState(
        isLoggedIn
            ? currentUser.retweetedTweetID.includes(tweet.tweetId)
            : false
    );
    const { isShowing, onClose, onOpen } = useModal();
    const [likecss, setLikecss] = useState(
        isLiked ? "tweet__action liked" : "tweet__action like"
    );
    const [retweetcss, setRetweetcss] = useState(
        isRetweeted ? "tweet__action retweeted" : "tweet__action retweet"
    );

    let tweetUrl = "";
    if (isComment) {
        tweetUrl = "localhost:8123/comment/" + tweet.tweetId;
    } else {
        tweetUrl = "localhost:8123/tweet/" + tweet.tweetId;
    }

    if (!isLoggedIn) {
        return null;
    }

    const handleLike = async (e) => {
        e.preventDefault();
        if (!isLiked) {
            setLikes(likes + 1);
            setLikecss("tweet__action liked");
        } else {
            setLikes(likes - 1);
            setLikecss("tweet__action like");
        }
        let likeurl = "";
        if (!isComment) {
            likeurl = "/home/likeTweet/" + tweet.tweetId;
        } else {
            likeurl = "/home/likeComment/" + tweet.tweetId;
        }
        const like = await fetch(likeurl, {
            method: "PATCH",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        setIsLiked(!isLiked);
    };

    const handleRetweet = async (e) => {
        e.preventDefault();
        if (!isRetweeted) {
            var details = {
                Content: tweet.text,
            };

            var ret = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                ret.push(encodedKey + "=" + encodedValue);
            }

            const response = await fetch("/home/retweet/" + tweet.tweetId, {
                method: "POST",
                body: ret.join("&"),
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            setRetweets(retweets + 1);
            setIsRetweeted(true);
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        onOpen();
    };

    const handleShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(tweetUrl);
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
                    isComment={isComment}
                />
                <span>{tweetStatistic.commentCount}</span>
            </div>
            {isComment ? (
                ""
            ) : (
                <div className={retweetcss}>
                    <IconButton size="small" onClick={handleRetweet}>
                        <FontAwesomeIcon icon={faRetweet} />
                    </IconButton>
                    <span>{retweets}</span>
                </div>
            )}

            <div className={likecss}>
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
