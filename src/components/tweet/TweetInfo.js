import Search from "../search/search";
import "./TweetInfo.css";

const TweetInfo = ({ tweet }) => {
    return (
        <div className="container">
            <div className="content">
                <div className="header">
                    <h3>Home</h3>
                </div>
            </div>
            <div className="searchBar">
                <Search />
            </div>
        </div>
    );
};

export default TweetInfo;
