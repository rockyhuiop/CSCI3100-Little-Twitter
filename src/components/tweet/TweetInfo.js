import Search from "../search/search";
import TweetDetails from "./TweetDetail";
import "./TweetInfo.css";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddTweetReuse from "../reusable/AddTweetReuse";

const TweetInfo = ({ tweet }) => {
    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="content">
                <div className="header">
                    <div className="tweet__action">
                        <IconButton
                            size="small"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <FontAwesomeIcon size="sm" icon={faArrowLeft} />
                        </IconButton>
                    </div>
                    <h3>Tweet</h3>
                </div>
                <TweetDetails tweet={tweet} />
                <AddTweetReuse />
            </div>
            <div className="searchBar">
                <Search />
            </div>
        </div>
    );
};

export default TweetInfo;
