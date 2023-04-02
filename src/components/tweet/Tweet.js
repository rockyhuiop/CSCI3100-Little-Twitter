import React, { useState } from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
    faHeart,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faRetweet } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

const Tweet = ({ tweet }) => {
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleRetweet = () => {
        setRetweets(retweets + 1);
    };

    return (
        <div className="tweet">
            <div className="tweet__header">
                <div className="tweet__headercontainer">
                    <img
                        src="https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png"
                        alt="Avatar"
                        className="tweet__avatar"
                    />
                </div>
                <div className="tweet__container">
                    <div className="tweet__title">
                        <div className="tweet__userinfo">
                            <span className="tweet__username">
                                <a href="/profile">John Doe</a>{" "}
                            </span>
                            <span className="tweet__uid">@johndoe033</span>
                            <span className="tweet__timestamp">
                                &nbsp;· 2h ago
                            </span>
                        </div>
                        <div>
                            <IconButton size="small">
                                <FontAwesomeIcon icon={faEllipsis} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="tweet__content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div className="tweet__actions">
                        <div className="tweet__action comment">
                            <IconButton size="small">
                                <FontAwesomeIcon icon={faComment} />
                            </IconButton>
                            <span>12</span>
                        </div>
                        <div className="tweet__action retweet">
                            <IconButton size="small">
                                <FontAwesomeIcon icon={faRetweet} />
                            </IconButton>
                            <span>5</span>
                        </div>
                        <div className="tweet__action like">
                            <IconButton size="small">
                                <FontAwesomeIcon icon={faHeart} />
                            </IconButton>
                            <span>5</span>
                        </div>
                        <div className="tweet__action share">
                            <IconButton size="small">
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </IconButton>
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
