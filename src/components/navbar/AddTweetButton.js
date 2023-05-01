import { Fragment } from "react";
import { useUser } from "../../utils/UserContext";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import styles from "./AddTweetButton.module.css";
import NavAddTweet from "./NavAddTweet";

/**
 * The big blue button in the navbar
 */
const AddTweetButton = () => {
    const { isShowing, onClose, onOpen } = useModal();
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <Fragment>
            <Button
                onClick={onOpen}
                id="hp-menu-at"
                additionalClasses={styles.special}
            >
                Add Tweet
            </Button>
            <NavAddTweet isShowing={isShowing} onClose={onClose} />
        </Fragment>
    );
};

export default AddTweetButton;
