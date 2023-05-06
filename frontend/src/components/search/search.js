import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

const Search = () => {
    const [onInput, setOnInput] = useState(styles.box); //to search box style
    const [content, setContent] = useState("");         //to store the user's search content
    const nav = useNavigate();
    /* change the style when user is inputting */
    const handleOnInput = () => {
        setOnInput(styles.box + " " + styles.oninput);
    };
    /* change back to default style when user is not inputting */
    const handleOnBlur = () => {
        setOnInput(styles.box);
    };
    /* search the content */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content !== "") {   //user search something
            /* fetch the require content */
            const response = await fetch(
                "/search/SearchTweetByContent/" + content
            );
            const json = await response.json();
            /* force user go to explore page to show the result */
            /* search: if user search something
               data: the fetched data
               content: user's search keyword 
            */
            nav("/explore", {
                state: {
                    search: true,
                    data: json.message,
                    content: content,
                },
            });
        } else {    //empty search
            /* force user go to explore page */
            /* search: if user search something
               data: the fetched data
            */
            nav("/explore", {
                state: {
                    search: false,
                    data: [],
                },
            });
        }
    };

    return (
        <>
            <div className={styles.search}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={onInput}>
                        <label htmlFor="search">
                            <FontAwesomeIcon icon={faSearch} />
                        </label>
                        {/* search box */}
                        <input
                            id="search"
                            className={styles.text}
                            type="text"
                            placeholder="Search Twitter"
                            name="search"
                            onFocus={handleOnInput}
                            onBlur={handleOnBlur}
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    {/* search icon */}
                    <button className={styles.button} type="submit">
                        <ion-icon name="search-outline" />
                    </button>
                </form>
            </div>
        </>
    );
};
export default Search;
