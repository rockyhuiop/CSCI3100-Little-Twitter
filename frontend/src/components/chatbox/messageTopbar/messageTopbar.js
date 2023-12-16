import "./messageTopbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { BACK_SER, SERVER_ADDRESS } from "../../../utils/constants";
import axios from "axios";

const MessageTopbar = ({ currentChat, currentUser }) => {
    const [user, setUser] = useState(null);
    const [userUrl, serUserUrl] = useState(null);

    useEffect(() => {
        const chatinguserID = currentChat.members.find(
            (m) => m !== currentUser.tweetID
        );

        // fetching all related users of the login user
        const getUser = async () => {
            try {
                const res = await axios.get(BACK_SER+"/user/" + chatinguserID,
                { withCredentials: true });
                setUser(res.data.data);
                serUserUrl("/profile/" + res.data.data.tweetID);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentChat, currentUser]);

    return (
        <div className="messageTopbarContainer">
            <Link to={userUrl}>
                <img
                    className="messageConversationImg"
                    src={
                        user?.avatar
                            ? SERVER_ADDRESS + user.avatar
                            : defaultUser
                    }
                    alt=""
                />
            </Link>

            <Link to={userUrl}>
                <span className="messageConversationName">{user?.name}</span>
            </Link>
        </div>
    );
};

export default MessageTopbar;
