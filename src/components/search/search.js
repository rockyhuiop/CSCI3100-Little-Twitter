import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./search.module.css";

const Search = () => {
    const [onInput, setOnInput] = useState(styles.box);

    const handleOnInput = () => {
        setOnInput(styles.box+" "+styles.oninput);
    };
    const handleOnBlur = () => {
        setOnInput(styles.box);
    };

    return (
        <>
            <div className={styles.search}>
                <form action="">
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
