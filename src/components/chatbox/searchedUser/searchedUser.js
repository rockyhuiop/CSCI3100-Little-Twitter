import axios from "axios";
import { useEffect, useState } from "react";
import defaultUser from "../../../assets/default.jpg";
import { SERVER_ADDRESS } from "../../../utils/constants";
import "./searchedUser.css";

const SearchedUser = ({ searchedUser }) => {
    const user = searchedUser;

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

export default SearchedUser;
