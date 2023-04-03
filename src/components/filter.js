import Tweet from "./tweet/Tweet";
import { useState } from "react";

const Filter = () => {
    const [ tab, setTab] = useState(0)
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
    const tabCon =[
        <div className="hp-search-con">
            <div className="hp-tweet-item">
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
        ,
        <div className="hp-search-con">
            <div className="hp-tweet-item">
                second tab test
            </div>
        </div>
    ]
    return (
        <>
            <div className="hp-search-tab">
                <button
                    id="hp-search-tab-po"
                    onClick={() => setTab(0)}
                    className={tab==0 ? "hp-search-active" : ""}
                >
                    Popular
                </button>
                <button id="hp-search-tab-re" 
                    onClick={() => setTab(1)}
                    className={tab==1 ? "hp-search-active" : ""}
                >
                    Recent
                </button>
            </div>
            {tabCon[tab]}
            
            
            
        </>
    );
};
export default Filter;