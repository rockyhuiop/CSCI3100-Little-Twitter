import React from "react";
import AddTweet from "../reusable/AddTweet";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import Tweet from "../tweet/Tweet";
const NavAddTweet = ({ isShowing, onClose, isReply, tweet }) => {
    const msg = "What's happening?";
    const btn = "Tweet";

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
                <AddTweet msg={msg} btn={btn} tweet={tweet} />
            </ModalBody>
        </Modal>
    );
};
export default NavAddTweet;
