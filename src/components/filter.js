import tweetPic from "../assets/tweet.png";
import { useState } from "react";

const Filter = () => {
    const [ tab, setTab] = useState(0)
    const tabCon =[
        <div className="hp-search-con">
            <div className="hp-tweet-item">
                <img src={tweetPic} />
            </div>
        </div>
        ,
        <div className="hp-search-con">
            <div className="hp-tweet-item">
                sdfsdf
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