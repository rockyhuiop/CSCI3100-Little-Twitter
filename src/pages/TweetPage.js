import React, { useEffect } from "react";
import TweetInfo from "../components/tweet/TweetInfo";

const tweet = {
    tweetId: "1",
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
};

const TweetPage = () => {
    return <TweetInfo tweet={tweet} />;
};
export default TweetPage;
