import { toggle_div } from "../../script/toggle_div";
import Button from "../reusable/Button";
import styles from "./AddTweetButton.module.css";

const AddTweetButton = () => {
    return (
        <Button
            onClick={() => toggle_div(1, "hp-addtw")}
            id="hp-menu-at"
            additionalClasses={styles.special}
        >
            Add Tweet
        </Button>
    );
};

export default AddTweetButton;
