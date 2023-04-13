import "./message.css";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../../utils/constants";
import { format } from "timeago.js";

export default function Message({ message, own }) {
    const [user, setUser] = useState(null);
    const senderID = message.sender;

    useEffect(() => {
        // fetching sender info
        const getUser = async () => {
            try {
                const res = await axios.get("/user/" + senderID);
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [senderID]);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        user?.avatar
                            ? SERVER_ADDRESS + user.avatar
                            : defaultUser
                    }
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}
