import { Route, Routes } from "react-router-dom";
import Bookmark_page from "../pages/bookmark_page";
import Explore from "../pages/explore";
import Homepage from "../pages/homepage";
import Message_page from "../pages/message_page";
import Profile from "../pages/Profile";
import TweetPage from "../pages/TweetPage";
import UserManagement from "../pages/UserManagement";
import styles from "./MainContent.module.css";

const MainContent = () => {
    return (
        <div className={styles.content}>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile/:tweetID?" element={<Profile />} />{" "}
                <Route path="/profile/tweet" element={<TweetPage />} />
                <Route path="/bookmark" element={<Bookmark_page />} />
                <Route path="/message" element={<Message_page />} />
                <Route path="/manage/users" element={<UserManagement />} />
            </Routes>
        </div>
    );
};

export default MainContent;
