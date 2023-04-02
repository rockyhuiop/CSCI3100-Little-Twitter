import React, { useState } from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
    faHeart,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

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
                    <div className="tweet__userinfo">
                        <span className="tweet__username">John Doe</span>
                        <span className="tweet__timestamp">2h ago</span>
                    </div>
                    <div className="tweet__content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div className="tweet__actions">
                        <div className="tweet__action">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>12</span>
                        </div>
                        <div className="tweet__action">
                            <FontAwesomeIcon icon={faRetweet} />
                            <span>5</span>
                        </div>
                        <div className="tweet__action">
                            <FontAwesomeIcon icon={faComment} />
                            <span>5</span>
                        </div>
                        <div className="tweet__action">
                            <FontAwesomeIcon icon={faShareFromSquare} />
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
