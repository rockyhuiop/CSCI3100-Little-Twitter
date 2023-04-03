import Tweet from "../tweet/Tweet";
import { useState } from "react";
import styles from "./filter.module.css"

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
        <div className={styles.con}>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
        ,
        <div className={styles.con}>          
            second tab test
        </div>
    ]
    return (
        <>
            <div className={styles.tab}>
                <button
                    id="hp-search-tab-po"
                    onClick={() => setTab(0)}
                    className={tab==0 ? styles.active : ""}
                >
                    Popular
                </button>
                <button id="hp-search-tab-re" 
                    onClick={() => setTab(1)}
                    className={tab==1 ? styles.active : ""}
                >
                    Recent
                </button>
            </div>
            {tabCon[tab]}
            
            
            
        </>
    );
};
export default Filter;