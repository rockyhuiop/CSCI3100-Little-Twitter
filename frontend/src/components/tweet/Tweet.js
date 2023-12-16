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
import { useState } from "react";
import defaultUser from "../../assets/default.jpg";
import { BACK_SER, SERVER_ADDRESS } from "../../utils/constants";
import { distance } from "../../utils/distance";

const Tweet = ({ tweet, type, isModal }) => {
    const { isLoggedIn, setUser, user: currentUser, refreshUser } = useUser();
    var isTweetAuthor = false;
    if (currentUser == null) {
        isTweetAuthor = false;
    } else if (currentUser.tweetID == tweet.user.userId) {
        isTweetAuthor = true;
    } else {
        isTweetAuthor = false;
    }
    const navigate = useNavigate();
    const tweetStatistic = {
        commentCount: tweet.commentCount,
        retweetCount: tweet.retweetCount,
        likeCount: tweet.likeCount,
        viewCount: tweet.viewCount,
    };

    // const userUrl = "/" + tweet.user.userId;
    const userUrl = "/profile/" + tweet.user.userId;
    let tweetUrl = "";
    if (type == "comment" || type == "middle") {
        tweetUrl = "/comment/" + tweet.tweetId;
    } else {
        tweetUrl = "/tweet/" + tweet.tweetId;
    }

    let tweetitem = tweet;
    if (tweet.retweet) {
        tweetUrl = "/tweet/" + tweet.retweet.TweetID;
        tweetitem.retweetor = tweet.retweet.CreatorUserID;
        tweetitem.tweetId = tweet.retweet.TweetID;
        tweetitem.user = {
            userId: tweet.user.userId,
            name: tweet.user.name,
            profile_image_url: tweet.user.profile_image_url
                /*? SERVER_ADDRESS +
                  tweet.retweet.CreatorAvastar.replace("\\", "/")
                */
                ? tweet.user.profile_image_url
                : defaultUser,
        };
        tweetitem.date = tweet.date;
        tweetitem.text = tweet.retweet.Content;
    }

    const navigateToTweetUrl = (e) => {
        if (!isModal) {
            if (
                e.target.tagName == "DIV" &&
                !e.target.classList.contains("MuiBackdrop-root")
            ) {
                navigate(tweetUrl);
                window.location.reload();
            }
        }
    };
    const follow = async (id) => {
        const fol = await fetch(BACK_SER+"/user/follow/" + id, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const fol_json = await fol.json();
        refreshUser();
    };

    const bookmark = async (id) => {
        const bm = await fetch(BACK_SER+"/user/bookmark/" + id, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const bm_json = await bm.json();
        refreshUser();
    };

    return (
        <div
            className={
                type == "root" || type == "middle" ? "tweet_root" : "tweet"
            }
            onClick={navigateToTweetUrl}
        >
            <div className="tweet__header">
                <div className="avatarColumn">
                    <div className="tweet__headercontainer">
                        <Link to={userUrl}>
                            <img
                                src={tweetitem.user.profile_image_url}
                                alt="Avatar"
                                className="tweet__avatar"
                            />
                        </Link>
                    </div>
                    {type == "root" || type == "middle" ? (
                        <div className="stick"></div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="tweet__container">
                    <small className="tweet__replyinfo">
                        {tweetitem.retweetor ? (
                            <div>
                                <Link to={"/profile/" + tweetitem.retweetor}>
                                    @{tweetitem.retweetor}
                                </Link>{" "}
                                Retweeted
                            </div>
                        ) : (
                            ""
                        )}
                    </small>
                    <div className="tweet__title">
                        <div className="tweet__userinfo">
                            <span className="tweet__username">
                                <Link to={userUrl}>{tweetitem.user.name}</Link>{" "}
                            </span>
                            <span className="tweet__uid">
                                @{tweetitem.user.userId}
                            </span>
                            <span className="tweet__timestamp">
                                &nbsp;· {tweetitem.date + " ago"}
                            </span>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {isLoggedIn && !isModal ? (
                                currentUser.tweetID == tweetitem.user.userId ? (
                                    <IconMenu
                                        clickHandlers={[
                                            () => bookmark(tweetitem.tweetId),
                                        ]}
                                        icons={[
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                            />,
                                        ]}
                                        names={[
                                            currentUser.bookmark.includes(
                                                tweetitem.tweetId
                                            )
                                                ? "Unbookmark"
                                                : "Bookmark",
                                        ]}
                                        keySuffix={tweetitem.tweetId}
                                    />
                                ) : (
                                    <IconMenu
                                        clickHandlers={[
                                            () => follow(tweetitem.user.userId),
                                            () => bookmark(tweetitem.tweetId),
                                        ]}
                                        icons={[
                                            <FontAwesomeIcon
                                                icon={faUserXmark}
                                            />,
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                            />,
                                        ]}
                                        names={[
                                            currentUser.followings.includes(
                                                tweetitem.user.userId
                                            )
                                                ? "Unfollow"
                                                : "Follow",
                                            currentUser.bookmark.includes(
                                                tweetitem.tweetId
                                            )
                                                ? "Unbookmark"
                                                : "Bookmark",
                                        ]}
                                        keySuffix={tweetitem.tweetId}
                                    />
                                )
                            ) : (
                                " "
                            )}
                        </div>
                    </div>

                    <small className="tweet__replyinfo">
                        {type == "comment" || type == "middle" ? (
                            <div>
                                Replying to{" "}
                                <Link
                                    to={
                                        "/profile/" +
                                        tweetitem.in_reply_to_userId
                                    }
                                >
                                    @{tweetitem.in_reply_to_userId}
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </small>
                    {tweetitem.imageList ? (
                        <div className="tweet__content">
                            {tweetitem.imageList.map((img) => (
                                <img
                                    key={img}
                                    src={SERVER_ADDRESS + img}
                                    alt="img"
                                    className="tweet__img"
                                />
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="tweet__content">{tweetitem.text}</div>
                    {!isModal ? (
                        <TweetActions
                            tweetStatistic={tweetStatistic}
                            tweet={tweetitem}
                            isComment={type == "comment" || type == "middle"}
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
