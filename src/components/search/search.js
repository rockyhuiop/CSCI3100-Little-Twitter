import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./search.module.css";
import { set } from "date-fns";

const Search = () => {
    const [onInput, setOnInput] = useState(styles.box);
    const [content, setContent] = useState("")

    const handleOnInput = () => {
        setOnInput(styles.box+" "+styles.oninput);
    };
    const handleOnBlur = () => {
        setOnInput(styles.box);
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const response = await fetch("/home/SearchTweetByContent/"+content, {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const json = await response.json();
        console.log(json)
    }

    return (
        <>
            <div className={styles.search}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className={onInput}>
                        <label htmlFor="search">
                            <FontAwesomeIcon icon={faSearch} />
                        </label>
                        <input
                            id="search"
                            className={styles.text}
                            type="text"
                            placeholder="Search Twitter"
                            name="search"
                            onFocus={handleOnInput}
                            onBlur={handleOnBlur}
                            onChange={(e)=>setContent(e.target.value)}
                            value={content}
                        />
                    </div>

                    <button className={styles.button} type="submit">
                        <ion-icon name="search-outline" />
                    </button>
                </form>
            </div>
        </>
    );
};
export default Search;
