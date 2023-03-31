import tweetPic from "../assets/tweet.png";
import { search_tab } from "../script/search_tab";

const Filter = () => {
    return (
        <>
            <div className="hp-search-tab">
                <button
                    id="hp-search-tab-po"
                    onClick={() => search_tab(0)}
                    className="hp-search-active"
                >
                    Popular
                </button>
                <button id="hp-search-tab-re" onClick={() => search_tab(1)}>
                    Recent
                </button>
            </div>
            <div className="hp-search-con hp-search-con-active">
                <div className="hp-tweet-item">
                    <img src={tweetPic} />
                </div>
            </div>
            <div className="hp-search-con">
                <div className="hp-tweet-item">
                    <img src={tweetPic} />
                </div>
            </div>
        </>
    );
};
export default Filter;
