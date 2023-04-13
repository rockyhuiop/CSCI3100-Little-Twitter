import axios from "axios";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../../utils/constants";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentID, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/user/followings/" + currentID);
            setFriends(res.data);
        };
        getFriends();
    }, [currentID]);

    useEffect(() => {
        if (friends.length > 0) {
            setOnlineFriends(
                friends.filter((f) => onlineUsers.includes(f.tweetID))
            );
        }
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `/conversation/search/${currentID}/${user.tweetID}`
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((onlineuser) => (
                <div
                    className="chatOnlineFriend"
                    onClick={() => handleClick(onlineuser)}
                >
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                onlineuser?.avatar
                                    ? SERVER_ADDRESS + onlineuser.avatar
                                    : defaultUser
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{onlineuser?.name}</span>
                </div>
            ))}
        </div>
    );
}
