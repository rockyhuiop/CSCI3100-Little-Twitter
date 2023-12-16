import axios from "axios";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { BACK_SER, SERVER_ADDRESS } from "../../../utils/constants";
import "./conversation.css";

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const chatinguserID = conversation.members.find(
            (m) => m !== currentUser.tweetID
        );

        // fetching all related users of the login user
        const getUser = async () => {
            try {
                const res = await axios.get(BACK_SER+"/user/" + chatinguserID,
                { withCredentials: true });
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={user?.avatar ? SERVER_ADDRESS + user.avatar : defaultUser}
                alt=""
            />
            <span className="conversationName">
                <p>
                    <span className="conversationUserName">{user?.name} </span>
                    <span className="conversationUserID">
                        {" @" + user?.tweetID}
                    </span>
                </p>
            </span>
        </div>
    );
};

export default Conversation;
