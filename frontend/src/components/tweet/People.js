import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import Button from "../reusable/Button.js";
import "./Tweet.css";
import { BACK_SER } from "../../utils/constants.js";
/* This module is modified from Tweet.js, most of the it are the same, except for removing the tweet content, tweet reactioon. But show user follower  */
const People = ({ tweet, type, isModal }) => {
    const { user: currentUser, refreshUser } = useUser();
    const navigate = useNavigate();


    const userUrl = "/profile/" + tweet.userId;
    let tweetUrl = "";

    const navigateToTweetUrl = (e) => {
        if (!isModal) {
            if (
                e.target.tagName === "DIV" &&
                !e.target.classList.contains("MuiBackdrop-root")
            ) {
                navigate(tweetUrl);
                window.location.reload();
            }
        }
    };
    const follow = async (id) => {
        await fetch(BACK_SER+"/user/follow/" + id, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        refreshUser();
    };

    return (
        <div
            className={
                type === "root" || type === "middle" ? "tweet_root" : "tweet"
            }
            onClick={navigateToTweetUrl}
        >
            <div className="tweet__header">
                <div className="avatarColumn">
                    <div className="tweet__headercontainer">
                        <Link to={userUrl}>
                            <img
                                src={tweet.profile_image_url}
                                alt="Avatar"
                                className="tweet__avatar"
                            />
                        </Link>
                    </div>
                    {type === "root" || type === "middle" ? (
                        <div className="stick"></div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="tweet__container">
                    <div className="tweet__title">
                        <div className="tweet__userinfo">
                            <span className="tweet__username">
                                <Link to={userUrl}>{tweet.name}</Link>{" "}
                            </span>
                            <span className="tweet__uid">@{tweet.userId}</span>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {currentUser.tweetID === tweet.userId ? (
                                " "
                            ) : (
                                <Button onClick={() => follow(tweet.userId)}>
                                    <span style={{ color: "#fff" }}>
                                        {currentUser.followings.includes(
                                            tweet.userId
                                        )
                                            ? "Unfollow"
                                            : "Follow"}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="tweet__content">
                        {tweet.followers.length} Followers
                    </div>
                </div>
            </div>
        </div>
    );
};

export default People;
