import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TweetInfo from "../components/tweet/TweetInfo";
import { CalTime } from "../components/reusable/CalTime";
import { useUser } from "../utils/UserContext";
import { useFetch } from "../utils/useFetch";
import CenteredStatus from "../components/reusable/CenteredStatus";
import defaultUser from "../assets/default.jpg";
import { SERVER_ADDRESS } from "../utils/constants";

/*const tweet = {
    commentId: "1",
    in_reply_to_tweetId: "1",
    in_reply_to_userId: "hellokitty",
    rootTweet: {
        tweetId: "1",
        text: "root here!",
        user: {
            userId: "john_doe",
            name: "John Doe",
            profile_image_url:
                "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
        },
        media: "",
        date: "",
        likeCount: 4,
        commentCount: 5,
        retweetCount: 6,
        viewCount: 1000,
    },
    text: "Hello, Twitter!",
    user: {
        userId: "john_doe",
        name: "John Doe",
        profile_image_url:
            "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
    },
    media: "",
    created_at: "1:30 AM · Mar 21, 2023",
    likeCount: 4,
    commentCount: 5,
    retweetCount: 6,
    viewCount: 1000,
};*/

const TweetPage = () => {
    const [tweet, setTweet] = useState(null);
    const { user: currentUser } = useUser();

    const { tweetId } = useParams();
    const url = `/tweet/fetchTweet/${tweetId}`;

    useEffect(() => {
        const fetchTweet = async () => {
            const tweetitem = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (tweetitem.ok) {
                const tweetjson = await tweetitem.json();
                const creator = await fetch(
                    "/search/SearchUserById/"+tweetjson.message[0].CreatorUserID,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    }
                );
                const creator_json = await creator.json();
                const tweetobj = {
                    tweetId: tweetjson.message[0].TweetID,
                    text: tweetjson.message[0].Content,
                    user: {
                        userId: tweetjson.message[0].CreatorUserID,
                        name: tweetjson.message[0].CreatorUserName,
                        profile_image_url:
                            creator_json.data[0].avatar ? SERVER_ADDRESS+creator_json.data[0].avatar.replace("\\","/") : defaultUser,
                    },
                    media: "",
                    date: CalTime(tweetjson.message[0].CreateTime)[0],
                    likeCount: tweetjson.message[0].LikeCount,
                    commentCount: tweetjson.message[0].Comment.length,
                    retweetCount: tweetjson.message[0].ReTweetCount,
                    viewCount: 1000,
                };
                const comments = [];
                for (var i = 0; i < tweetjson.message[0].Comment.length; i++) {
                    const creator = await fetch(
                        "/search/SearchUserById/"+tweetjson.message[0].Comment[i]
                        .CreatorUserID,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                        }
                    );
                    const creator_json = await creator.json();
                    const comment = {
                        commentId: tweetjson.message[0].Comment[i].CommentID,
                        rootTweet: tweetobj,
                        in_reply_to_tweetId: tweetobj.tweetId,
                        in_reply_to_userId: tweetobj.user.userId,
                        text: tweetjson.message[0].Comment[i].Content,
                        user: {
                            userId: tweetjson.message[0].Comment[i]
                                .CreatorUserID,
                            name: tweetjson.message[0].Comment[i]
                                .CreatorUserName,
                            profile_image_url:
                                creator_json.data[0].avatar ? SERVER_ADDRESS+creator_json.data[0].avatar.replace("\\","/") : defaultUser,
                        },
                        media: "",
                        date: CalTime(
                            tweetjson.message[0].Comment[i].CreatTime
                        )[0],
                        likeCount: tweetjson.message[0].Comment[i].LikeCount,
                        commentCount:
                            tweetjson.message[0].Comment[i].ReplyComment.length,
                        retweetCount: 20,
                        viewCount: 2000,
                    };
                    comments.push(comment);
                }
                tweetobj.comments = comments;
                setTweet(tweetobj);
            }
        };
        fetchTweet();
    });

    useEffect(() => {
        setTimeout(() => {}, 1000);
    });

    return tweet == null ? "" : <TweetInfo tweet={tweet} isComment={false} />;
};
export default TweetPage;
