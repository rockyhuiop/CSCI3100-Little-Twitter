import { useState } from "react";
import RepliesTab from "./RepliesTab";
import styles from "./Tabs.module.css";
import TweetTab from "./TweetTab";

const Tabs = (user) => {
    // can either be tweets or replies
    const [currentTab, setCurrentTab] = useState("tweets");

    const isActive = (name) => {
        return currentTab === name;
    };

    return (
        <div>
            {/* Tab Selector */}
            <div className={styles.selector}>
                {/* only apply active class if current tab is it  */}
                <span
                    className={isActive("tweets") ? styles.active : ""}
                    onClick={() => setCurrentTab("tweets")}
                >
                    Tweets
                </span>
                <span
                    className={isActive("replies") ? styles.active : ""}
                    onClick={() => setCurrentTab("replies")}
                >
                    Replies
                </span>
            </div>
            <div>
                {/* conditionally render tabs based on state */}
                {currentTab === "tweets" ? (
                    <TweetTab {...user} />
                ) : (
                    <RepliesTab {...user} />
                )}
            </div>
        </div>
    );
};

export default Tabs;
