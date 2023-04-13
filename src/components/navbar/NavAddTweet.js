import React from "react";
import AddTweet from "../reusable/AddTweet";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import Tweet from "../tweet/Tweet";
const NavAddTweet = ({ isShowing, onClose, isReply, tweet, isComment }) => {
    const msg = "What's happening?";
    const btn = "Tweet";
    let commenturl = "";
    if (isReply) {
        if (isComment) {
            commenturl = "/tweet/replycomment/" + tweet.tweetId;
        } else {
            commenturl = "/tweet/comment/" + tweet.tweetId;
        }
    }

    return (
        <Modal isShowing={isShowing} onClose={onClose}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                {isReply ? (
                    <Tweet tweet={tweet} type={"root"} isModal={true} />
                ) : (
                    ""
                )}
                {isReply ? (
                    <AddTweet
                        msg={msg}
                        btn={btn}
                        url={commenturl}
                        type={"comment"}
                    />
                ) : (
                    <AddTweet msg={msg} btn={btn} />
                )}
            </ModalBody>
        </Modal>
    );
};
export default NavAddTweet;
