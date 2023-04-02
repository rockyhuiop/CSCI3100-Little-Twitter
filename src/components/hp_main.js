import tweet from "../assets/tweet.png";
import { useState } from "react";
import Search from "./search";
import Tweet from "./Tweet";
import "./hp_main.css";

const Hp_main = () => {
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
            <Search />
            <div className="hp-tweet-item">
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </>
    );
};
export default Hp_main;
