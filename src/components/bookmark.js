import { useState } from "react";
import Tweet from "./tweet/Tweet";

const Bookmark = () => {
    const [tweets, setTweets] = useState([
        {
            id: 1,
            text: "Hello, Twitter!",
            user: {
                name: "John Doe",
                screen_name: "john_doe",
                profile_image_url: "https://example.com/john_doe.jpg",
            },
        },
        
    ]);
    return (
        <>
            <div className="hp-bm-info">Bookmarks</div>
            <div className="hp-tweet-item">
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </>
    );
};
export default Bookmark;
