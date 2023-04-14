import "./messageTopbar.css";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../../utils/constants";
import axios from "axios";

const MessageTopbar = ({ currentChat, currentUser }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const chatinguserID = currentChat.members.find(
            (m) => m !== currentUser.tweetID
        );

        // fetching all related users of the login user
        const getUser = async () => {
            try {
                const res = await axios.get("/user/" + chatinguserID);
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentChat, currentUser]);

    return (
        <div className="messageTopbarContainer">
            <img
                className="messageConversationImg"
                src={user?.avatar ? SERVER_ADDRESS + user.avatar : defaultUser}
                alt=""
            />
            <span className="messageConversationName">{user?.name}</span>
        </div>
    );
};

export default MessageTopbar;
