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
            <div className="container">
                <div className="content">
                    <div className="header">
                        <h3>Home</h3>
                    </div>

                    <div className="hp-tweet-item">
                        {tweets.map((tweet) => (
                            <Tweet key={tweet.id} tweet={tweet} />
                        ))}
                    </div>
                </div>
                <div className="searchBar">
                    <Search />
                </div>
            </div>
        </>
    );
};
export default Hp_main;
