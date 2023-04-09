import React from "react";
import AddTweet from "../reusable/AddTweet";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";

const NavAddTweet = ({ isShowing, onClose }) => {
    const msg = "What's happening?";
    const btn = "Tweet";

    return (
        <Modal isShowing={isShowing} onClose={onClose}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <AddTweet msg={msg} btn={btn} />
            </ModalBody>
        </Modal>
    );
};
export default NavAddTweet;
