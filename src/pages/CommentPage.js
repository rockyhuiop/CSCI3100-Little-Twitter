import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TweetInfo from "../components/tweet/TweetInfo";
import { CalTime } from "../components/reusable/CalTime";
import { useUser } from "../utils/UserContext";
import { useFetch } from "../utils/useFetch";
import CenteredStatus from "../components/reusable/CenteredStatus";

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

const CommentPage = () => {
    const [tweet, setTweet] = useState(null);
    const [rootTweet, setRootTweet] = useState(null);
    const [rootComment, setRootComment] = useState(null);
    const [isTweetAuthor, setIsTweetAuthor] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { commentId } = useParams();
    const commurl = `/tweet/FetchCommentByCommentID/${commentId}`;

    useEffect(() => {
        const fetchTweet = async () => {
            const tweetitem = await fetch(commurl, {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (tweetitem.ok) {
                const tweetjson = await tweetitem.json();
                const tweetobj = {
                    tweetId: tweetjson.message.CommentID,
                    corrTweetID: tweetjson.message.CorrTweetID,
                    corrCommentID: tweetjson.message.CorrCommentID
                        ? tweetjson.message.CorrCommentID
                        : null,
                    in_reply_to_tweetId: tweetjson.message.CorrCommentID
                        ? tweetjson.message.CorrCommentID
                        : tweetjson.message.CorrTweetID,

                    text: tweetjson.message.Content,
                    user: {
                        userId: tweetjson.message.CreatorUserID,
                        name: tweetjson.message.CreatorUserName,
                        profile_image_url:
                            "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                    },
                    media: "",
                    date: CalTime(tweetjson.message.CreatTime)[0],
                    likeCount: tweetjson.message.LikeCount,
                    commentCount: tweetjson.message.ReplyComment
                        ? tweetjson.message.ReplyComment.length
                        : 0,
                    //retweetCount: tweetjson.message[0].ReTweetCount,
                    viewCount: 1000,
                };
                const comments = [];
                if (tweetjson.message.ReplyComment) {
                    for (
                        var i = 0;
                        i < tweetjson.message.ReplyComment.length;
                        i++
                    ) {
                        const comment = {
                            commentId:
                                tweetjson.message.ReplyComment[i].CommentID,
                            rootTweet: tweetobj,
                            in_reply_to_tweetId: tweetobj.tweetId,
                            in_reply_to_userId: tweetobj.user.userId,
                            text: tweetjson.message.ReplyComment[i].Content,
                            user: {
                                userId: tweetjson.message.ReplyComment[i]
                                    .CreatorUserID,
                                name: tweetjson.message.ReplyComment[i]
                                    .CreatorUserName,
                                profile_image_url:
                                    "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                            },
                            media: "",
                            date: CalTime(
                                tweetjson.message.ReplyComment[i].CreatTime
                            )[0],
                            likeCount:
                                tweetjson.message.ReplyComment[i].LikeCount,
                            commentCount: tweetjson.message.ReplyComment[i]
                                .ReplyComment
                                ? tweetjson.message.ReplyComment[i].ReplyComment
                                      .length
                                : 0,
                            retweetCount: 20,
                            viewCount: 2000,
                        };
                        comments.push(comment);
                    }
                    tweetobj.comments = comments;
                }

                /*
                if(tweetobj.user.userId === currentUser.tweetID){
                    setIsTweetAuthor(true);
                }
                */

                setTweet(tweetobj);
            }

            if (tweet) {
                const rooturl = `/tweet/fetchTweet/${tweet.corrTweetID}`;
                const fetchRootTweet = async () => {
                    const tweetitem = await fetch(rooturl, {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                    });
                    if (tweetitem.ok) {
                        const tweetjson = await tweetitem.json();
                        const tweetobj = {
                            tweetId: tweetjson.message[0].TweetID,
                            text: tweetjson.message[0].Content,
                            user: {
                                userId: tweetjson.message[0].CreatorUserID,
                                name: tweetjson.message[0].CreatorUserName,
                                profile_image_url:
                                    "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                            },
                            media: "",
                            date: CalTime(tweetjson.message[0].CreateTime)[0],
                            likeCount: tweetjson.message[0].LikeCount,
                            commentCount: tweetjson.message[0].Comment.length,
                            retweetCount: tweetjson.message[0].ReTweetCount,
                            viewCount: 1000,
                        };
                        setRootTweet(tweetobj);
                    }
                };
                fetchRootTweet();

                if (tweet.CorrCommentID) {
                    const rootcommenturl = `/tweet/FetchCommentByCommentID/${tweet.corrCommentID}`;
                    const fetchRootComment = async () => {
                        const tweetitem = await fetch(rootcommenturl, {
                            method: "GET",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                        });

                        if (tweetitem.ok) {
                            const tweetjson = await tweetitem.json();
                            const commentobj = {
                                commentId: tweetjson.message.CommentID,
                                in_reply_to_tweetId: tweetjson.message
                                    .CorrCommentID
                                    ? tweetjson.message.CorrCommentID
                                    : tweetjson.message.CorrTweetID,
                                //in_reply_to_userId: tweet.user.userId,
                                text: tweetjson.message.ReplyComment[i].Content,
                                user: {
                                    userId: tweetjson.message.CreatorUserID,
                                    name: tweetjson.message.CreatorUserName,
                                    profile_image_url:
                                        "https://pbs.twimg.com/profile_images/1632814091319508994/cwm-3OQE_400x400.png",
                                },
                                media: "",
                                date: CalTime(tweetjson.message.CreatTime)[0],
                                likeCount: tweetjson.message.LikeCount,
                                commentCount: tweetjson.message.ReplyComment[i]
                                    .ReplyComment
                                    ? tweetjson.message.ReplyComment[i]
                                          .ReplyComment.length
                                    : 0,
                                retweetCount: 20,
                                viewCount: 2000,
                            };

                            if (tweet.corrCommentID) {
                                const parentcommenturl = `/tweet/FetchCommentByCommentID/${commentobj.CorrCommentID}`;
                                const parentcommentitem = await fetch(
                                    parentcommenturl,
                                    {
                                        method: "GET",
                                        headers: {
                                            "Content-Type":
                                                "application/x-www-form-urlencoded;charset=UTF-8",
                                        },
                                    }
                                );
                                if (parentcommentitem.ok) {
                                    const parentcommentjson =
                                        await parentcommentitem.json();
                                    const parentuserid =
                                        parentcommentjson.message.CreatorUserID;
                                    commentobj.in_reply_to_userId =
                                        parentuserid;
                                }
                            }

                            setRootComment(commentobj);
                        }
                    };
                    fetchRootComment();
                    const newtweet = tweet;
                    if (rootComment) {
                        newtweet.in_reply_to_userId = rootComment.user.userId;
                        setTweet(newtweet);
                        setIsLoading(false);
                    }
                } else {
                    const newtweet = tweet;
                    if (rootTweet) {
                        newtweet.in_reply_to_userId = rootTweet.user.userId;
                        setTweet(newtweet);
                        setIsLoading(false);
                    }
                }
            }
        };
        fetchTweet();
    });

    return !isLoading ? (
        <TweetInfo
            tweet={tweet}
            isComment={true}
            rootTweet={rootTweet}
            rootComment={rootComment}
            isTweetAuthor={isTweetAuthor}
        />
    ) : (
        ""
    );
};
export default CommentPage;
