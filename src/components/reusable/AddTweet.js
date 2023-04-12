import { useEffect, useRef, useState } from "react";
import { Image } from "react-feather";
import defaultUser from "../../assets/default.jpg";
import styles from "../navbar/AddTweet.module.css";
import Button from "./Button";
import { useUser } from "../../utils/UserContext";

const AddTweet = ({ msg, btn }) => {
    const WORD_LIMIT = 120;
    const { user: currentUser } = useUser();
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
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
    const formData = new FormData();

    const handleSubmit = async (e) =>{
        try {
            formData.append("Content", text);
            if (file) {
                formData.append("images", file);
            }
            const response = await fetch("/home", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            } 
        } catch (error) {
            setError(error);
        }
    }

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
        <form className={styles.form} name="hp-addtw" onSubmit={handleSubmit}>
            <div className={styles.row}>
                <img
                    className={styles.avatar}
                    src={currentUser.avatar ? currentUser.avatar : defaultUser}
                    alt="Avatar of user"
                />
                <textarea
                    onChange={(e) => updateTextarea(e)}
                    value={text}
                    placeholder={msg}
                    className={styles.input}
                    rows={1}
                    ref={textareaRef}
                    autoFocus
                />
            </div>
            <p className={styles.limit}>
                {WORD_LIMIT - text.length} characters left.
            </p>
            <div className={styles["add-file-row"]}>
                <div className={styles.left}>
                    <Image onClick={choosePicture} className={styles.select} />
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
                <Button>{btn}</Button>
            </div>
        </form>
    );
};
export default AddTweet;
