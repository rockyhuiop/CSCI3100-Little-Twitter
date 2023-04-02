import React, { useRef, useState } from "react";
import { Image } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import Button from "../reusable/Button";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import styles from "./AddTweet.module.css";

const WORD_LIMIT = 120;

const AddTweet = ({ isShowing, onClose }) => {
    const [file, setFile] = useState("");
    const [text, setText] = useState("");
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
                <form className={styles.form} name="hp-addtw">
                    <div className={styles.row}>
                        <img
                            className={styles.avatar}
                            src={defaultUser}
                            alt="Avatar of user"
                        />
                        {/* It should probably not grow since there is a word limit in Twitter  */}
                        <textarea
                            onChange={(e) => updateTextarea(e)}
                            value={text}
                            placeholder="What's happening?"
                            className={styles.input}
                            rows={6}
                            ref={textareaRef}
                            autoFocus
                        />
                    </div>
                    <p className={styles.limit}>
                        {WORD_LIMIT - text.length} characters left.
                    </p>
                    <div className={styles["add-file-row"]}>
                        <div className={styles.left}>
                            <Image
                                onClick={choosePicture}
                                className={styles.select}
                            />
                            {/* hide the file input */}
                            <input
                                className={styles.file}
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                multiple={false}
                                ref={ref}
                            />
                            <span>{getFileNames()}</span>
                        </div>
                        <Button>Add tweet</Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};
export default AddTweet;
