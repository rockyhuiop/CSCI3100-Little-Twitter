import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconMenu from "../reusable/IconMenu.js";
import "./Tweet.css";
import TweetActions from "./TweetActions.js";

const Tweet = ({ tweet, isComment }) => {
    const navigate = useNavigate();
    const tweetStatistic = {
        commentCount: tweet.commentCount,
        retweetCount: tweet.retweetCount,
        likeCount: tweet.likeCount,
        viewCount: tweet.viewCount,
    };

    // const userUrl = "/" + tweet.user.userId;
    const userUrl = "/profile";
    // const tweetUrl = userUrl + "/" + tweet.tweetId;
    const tweetUrl = userUrl + "/tweet";

    const navigateToTweetUrl = (e) => {
        if (
            e.target.tagName == "DIV" &&
            !e.target.classList.contains("MuiBackdrop-root")
        ) {
            navigate(tweetUrl);
        }
    };

    return (
        <div className="tweet" onClick={navigateToTweetUrl}>
            <div className="tweet__header">
                <div className="tweet__headercontainer">
                    <Link to={userUrl}>
                        <img
                            src={tweet.user.profile_image_url}
                            alt="Avatar"
                            className="tweet__avatar"
                        />
                    </Link>
                </div>
                <div className="tweet__container">
                    <div className="tweet__title">
                        <div className="tweet__userinfo">
                            <span className="tweet__username">
                                <Link to={userUrl}>{tweet.user.name}</Link>{" "}
                            </span>
                            <span className="tweet__uid">
                                @{tweet.user.userId}
                            </span>
                            <span className="tweet__timestamp">
                                &nbsp;· 2h ago
                            </span>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <IconMenu
                                clickHandlers={[null, null]}
                                icons={[
                                    <FontAwesomeIcon icon={faUserXmark} />,
                                    <FontAwesomeIcon icon={faBookmark} />,
                                ]}
                                names={["Unfollow", "Bookmark"]}
                                keySuffix={tweet.tweetId}
                            />
                        </div>
                    </div>
                    <div>
                        <span>{isComment ? "Replying to " : ""}</span>
                    </div>
                    <div className="tweet__content">{tweet.text}</div>
                    <TweetActions tweetStatistic={tweetStatistic} />
                </div>
            </div>
        </div>
    );
};

export default Tweet;
