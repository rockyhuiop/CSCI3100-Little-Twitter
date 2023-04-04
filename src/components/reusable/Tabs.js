import { useState } from "react";
import styles from "./Tabs.module.css";

/**
 * children: the tabs
 * tabNames: names of the tabs. It should follow the same order as children
 */
const Tabs = ({ children, tabNames }) => {
    // tab 0 is the first, tab 1 is the second tab etc
    const [currentTab, setCurrentTab] = useState(0);

    const isActiveClasses = (index) => {
        return currentTab === index ? styles.active : "";
    };

    return (
        <div>
            {/* Tab Selector */}
            <div className={styles.selector}>
                {/* only apply active class if current tab is it  */}
                {tabNames.map((name, idx) => {
                    return (
                        <span
                            className={isActiveClasses(idx)}
                            onClick={() => setCurrentTab(idx)}
                            key={`tabs-${name}`}
                        >
                            {name}
                        </span>
                    );
                })}
            </div>
            {/* Render the active tab */}
            <div>{children[currentTab]}</div>
        </div>
    );
};

export default Tabs;
