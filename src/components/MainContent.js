import { Route, Routes } from "react-router-dom";
import Bookmark_page from "../pages/bookmark_page";
import Explore from "../pages/explore";
import Homepage from "../pages/homepage";
import Profile from "../pages/Profile";
import UserManagement from "../pages/UserManagement";
import styles from "./MainContent.module.css";

const MainContent = () => {
    return (
        <div className={styles.content}>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookmark" element={<Bookmark_page />} />
                <Route path="/manage/users" element={<UserManagement />} />
            </Routes>
        </div>
    );
};

export default MainContent;
