import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Search = () => {
    const [onInput, setOnInput] = useState("hp-search-box");

    const handleOnInput = () => {
        setOnInput("hp-search-box-oninput");
    };
    const handleOnBlur = () => {
        setOnInput("hp-search-box");
    };

    return (
        <>
            <div className="hp-search">
                <form action="">
                    <div className={onInput}>
                        <label htmlFor="search">
                            <FontAwesomeIcon icon={faSearch} />
                        </label>
                        <input
                            id="search"
                            className="hp-search-text"
                            type="text"
                            placeholder="Search Twitter"
                            name="search"
                            onFocus={handleOnInput}
                            onBlur={handleOnBlur}
                        />
                    </div>

                    <button className="hp-search-button" type="submit">
                        <ion-icon name="search-outline" />
                    </button>
                </form>
            </div>
        </>
    );
};
export default Search;
