import { toggle_div } from "../../script/toggle_div";
import { useContext } from "react";
import { Add_twContext } from "./Navbar";
import Button from "../reusable/Button";
import styles from "./AddTweetButton.module.css";

const AddTweetButton = () => {
    const { openAddTw } = useContext(Add_twContext);
    return (
        <Button
            onClick={openAddTw}
            id="hp-menu-at"
            additionalClasses={styles.special}
        >
            Add Tweet
        </Button>
    );
};

export default AddTweetButton;
