import React, { useRef, useState } from "react";
import { Image } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import Button from "../reusable/Button";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import styles from "./AddTweet.module.css";
import AddTweetReuse from "../reusable/AddTweetReuse";

const WORD_LIMIT = 120;

const AddTweet = ({ isShowing, onClose }) => {
    const [file, setFile] = useState("");
    const [text, setText] = useState("");

    const msg = "What's happening?";
    const btn = "Tweet";

    const ref = useRef(null);
    const textareaRef = useRef(null);

    const choosePicture = () => {
        ref.current.click();
    };

    const getFileNames = () => {
        return file ? file.name : "No file chosen";
    };

    const updateTextarea = (e) => {
        if (e.target.value.length <= WORD_LIMIT) {
            setText(e.target.value);
        }
    };

    return (
        <Modal isShowing={isShowing} onClose={onClose}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <AddTweetReuse msg={msg} btn={btn} />
            </ModalBody>
        </Modal>
    );
};
export default AddTweet;
