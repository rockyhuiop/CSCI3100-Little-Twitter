import { useEffect, useRef, useState } from "react";
import { Image } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import addtw_styles from "../navbar/AddTweet.module.css";
import Button from "./Button";

const AddTweetReuse = ({ msg, btn }) => {
    const WORD_LIMIT = 120;
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

    useEffect(() => {
        if (textareaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [textareaRef, text]);

    return (
        <form className={addtw_styles.form} name="hp-addtw">
            <div className={addtw_styles.row}>
                <img
                    className={addtw_styles.avatar}
                    src={defaultUser}
                    alt="Avatar of user"
                />
                <textarea
                    onChange={(e) => updateTextarea(e)}
                    value={text}
                    placeholder={msg}
                    className={addtw_styles.input}
                    rows={1}
                    ref={textareaRef}
                    autoFocus
                />
            </div>
            <p className={addtw_styles.limit}>
                {WORD_LIMIT - text.length} characters left.
            </p>
            <div className={addtw_styles["add-file-row"]}>
                <div className={addtw_styles.left}>
                    <Image
                        onClick={choosePicture}
                        className={addtw_styles.select}
                    />
                    {/* hide the file input */}
                    <input
                        className={addtw_styles.file}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        multiple={false}
                        ref={ref}
                    />
                    <span>{getFileNames()}</span>
                </div>
                <Button>{btn}</Button>
            </div>
        </form>
    );
};
export default AddTweetReuse;
