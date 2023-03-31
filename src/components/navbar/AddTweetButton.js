import { toggle_div } from "../../script/toggle_div";
import styles from "./AddTweetButton.module.css";

const AddTweetButton = () => {
    return (
        <button
            onClick={() => toggle_div(1, "hp-addtw")}
            type="button"
            id="hp-menu-at"
            className={styles.button}
        >
            Add tweet
        </button>
    );
};

export default AddTweetButton;
