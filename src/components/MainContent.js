import { Route, Routes } from "react-router-dom";
import Bookmark_page from "../pages/bookmark_page";
import Explore from "../pages/explore";
import Homepage from "../pages/homepage";
import styles from "./MainContent.module.css";

const MainContent = () => {
    return (
        <div className={styles.content}>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/bookmark" element={<Bookmark_page />} />
            </Routes>
        </div>
    );
};

export default MainContent;
