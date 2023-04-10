import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconMenu from "../reusable/IconMenu.js";
import "./TweetDetail.css";
import TweetActions from "./TweetActions.js";
import { useEffect } from "react";

const TweetDetails = ({ tweet, type }) => {
    const [screenViewCount, setScreenViewCount] = useState(tweet.viewCount);

    const tweetStatistic = {
        commentCount: tweet.commentCount,
        retweetCount: tweet.retweetCount,
        likeCount: tweet.likeCount,
        viewCount: tweet.viewCount,
    };

    const handleViewCount = (viewCount) => {
        let screenViewCount = 0;
        if (viewCount >= 1000000) {
            screenViewCount =
                parseFloat(viewCount / 1000000.0).toFixed(1) + "M";
        } else if (viewCount >= 1000) {
            screenViewCount = parseFloat(viewCount / 1000.0).toFixed(1) + "K";
        } else {
            screenViewCount = "" + viewCount;
        }
        return screenViewCount;
    };

    useEffect(() => {
        setScreenViewCount(handleViewCount(tweet.viewCount));
    }, [screenViewCount]);

    // const userUrl = "/" + tweet.user.userId;
    const userUrl = "/profile";
    // const tweetUrl = userUrl + "/" + tweet.tweetId;
    const tweetUrl = userUrl + "/tweet";

    return (
        <div
            className={
                type == "comment" ? "tweet__static_bottom" : "tweet__static"
            }
        >
            <div className="tweet__header">
                <div className="avatarColumn">
                    {type == "comment" ? (
                        <div className="stick_bottom"></div>
                    ) : (
                        ""
                    )}

                    <div className="tweet__headercontainer">
                        <Link to={userUrl}>
                            <img
                                src={tweet.user.profile_image_url}
                                alt="Avatar"
                                className="tweet__avatar"
                            />
                        </Link>
                    </div>
                </div>

                <div className="tweet__container">
                    <div
                        className={
                            type == "comment"
                                ? "tweet__title_bottom"
                                : "tweet__title"
                        }
                    >
                        <div className="tweet__static__userinfo">
                            <span className="tweet__username">
                                <Link to={userUrl}>{tweet.user.name}</Link>{" "}
                            </span>
                            <small className="tweet__uid">
                                @{tweet.user.userId}
                            </small>
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
                </div>
            </div>
            <small className="tweet__replyinfo_static">
                {type == "comment" ? (
                    <div>
                        Replying to{" "}
                        <Link to={userUrl}>@{tweet.in_reply_to_userId}</Link>
                    </div>
                ) : (
                    ""
                )}
            </small>
            <div className="tweet__static__content">{tweet.text}</div>
            <div className="tweet__timeInfo info">
                <span>{tweet.created_at}</span>
                <span>
                    {" · "}
                    <b>{screenViewCount}</b>
                    {" Views"}
                </span>
            </div>
            <div className="tweet__statistic info">
                {tweet.retweetCount != 0 ? (
                    <span>
                        <b>{tweet.retweetCount}</b> Retweets
                    </span>
                ) : (
                    ""
                )}
                {tweet.likeCount != 0 ? (
                    <span>
                        <b>{tweet.likeCount}</b> Likes
                    </span>
                ) : (
                    ""
                )}
            </div>
            <TweetActions tweetStatistic={tweetStatistic} tweet={tweet} />
        </div>
    );
};

export default TweetDetails;