import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconMenu from "../reusable/IconMenu.js";
import "./Tweet.css";
import TweetActions from "./TweetActions.js";
import { useUser } from "../../utils/UserContext";
import { Bookmark } from "react-feather";

const Tweet = ({ tweet, type, isModal }) => {
    const { isLoggedIn, setUser, user: currentUser, refreshUser } = useUser();
    const navigate = useNavigate();
    const tweetStatistic = {
        commentCount: tweet.commentCount,
        retweetCount: tweet.retweetCount,
        likeCount: tweet.likeCount,
        viewCount: tweet.viewCount,
    };

    // const userUrl = "/" + tweet.user.userId;
    const userUrl = "/profile/"+tweet.user.userId;
    // const tweetUrl = userUrl + "/" + tweet.tweetId;
    const tweetUrl = "/tweet/" + tweet.tweetId;

    const navigateToTweetUrl = (e) => {
        if (!isModal) {
            if (
                e.target.tagName == "DIV" &&
                !e.target.classList.contains("MuiBackdrop-root")
            ) {
                navigate(tweetUrl);
            }
        }
    };


    const bookmark = async (id) => {
        const bm = await fetch("/user/bookmark/" + id, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const bm_json = await bm.json();
        console.log(bm_json);
        refreshUser();
    };

    return (
        <div
            className={type == "root" ? "tweet_root" : "tweet"}
            onClick={navigateToTweetUrl}
        >
            <div className="tweet__header">
                <div className="avatarColumn">
                    <div className="tweet__headercontainer">
                        <Link to={userUrl}>
                            <img
                                src={tweet.user.profile_image_url}
                                alt="Avatar"
                                className="tweet__avatar"
                            />
                        </Link>
                    </div>
                    {type == "root" ? <div className="stick"></div> : ""}
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
                                &nbsp;· {tweet.date + " ago"}
                            </span>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {isLoggedIn && !isModal ? (
                                <IconMenu
                                    clickHandlers={[
                                        null,
                                        () => bookmark(tweet.tweetId),
                                    ]}
                                    icons={[
                                        <FontAwesomeIcon icon={faUserXmark} />,
                                        <FontAwesomeIcon icon={faBookmark} />,
                                    ]}
                                    names={[
                                        currentUser.followings.includes(
                                            tweet.user.userId
                                        )
                                            ? "Unfollow"
                                            : "Follow",
                                        currentUser.bookmark.includes(
                                            tweet.tweetId
                                        )
                                            ? "Unbookmark"
                                            : "Bookmark",
                                    ]}
                                    keySuffix={
                                        type == "comment"
                                            ? tweet.tweetId
                                            : tweet.commentId
                                    }
                                />
                            ) : (
                                " "
                            )}
                        </div>
                    </div>
                    <small className="tweet__replyinfo">
                        {type == "comment" ? (
                            <div>
                                Replying to{" "}
                                <Link to={userUrl}>
                                    @{tweet.in_reply_to_userId}
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </small>
                    <div className="tweet__content">{tweet.text}</div>
                    {!isModal ? (
                        <TweetActions
                            tweetStatistic={tweetStatistic}
                            tweet={tweet}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tweet;
