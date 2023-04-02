import { Fragment } from "react";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import AddTweet from "./AddTweet";
import styles from "./AddTweetButton.module.css";

const AddTweetButton = () => {
    const { isShowing, onClose, onOpen } = useModal();
    return (
        <Fragment>
            <Button
                onClick={onOpen}
                id="hp-menu-at"
                additionalClasses={styles.special}
            >
                Add Tweet
            </Button>
            <AddTweet isShowing={isShowing} onClose={onClose} />
        </Fragment>
    );
};

export default AddTweetButton;
