import React from "react";
import TweetInfo from "../components/tweet/TweetInfo";

const tweet = {
    tweetId: "1",
    text: "Hello, Twitter!",
    user: {
        userId: "john_doe",
        name: "John Doe",
        profile_image_url: "https://example.com/john_doe.jpg",
    },
    media: "",
    date: "",
    likeCount: 4,
    commentCount: 5,
    retweetCount: 6,
    viewCount: 1000,
};

const TweetPage = () => {
    return <TweetInfo tweet={tweet} />;
};
export default TweetPage;
