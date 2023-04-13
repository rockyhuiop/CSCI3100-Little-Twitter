import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./search.module.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [onInput, setOnInput] = useState(styles.box);
    const [content, setContent] = useState("")
    const nav = useNavigate();

    const handleOnInput = () => {
        setOnInput(styles.box+" "+styles.oninput);
    };
    const handleOnBlur = () => {
        setOnInput(styles.box);
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (content!=""){
            const response = await fetch("/search/SearchTweetByContent/"+content, {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            console.log(json);
            nav("/explore",{
                state :{
                    search : true,
                    data : json.message,
                    content : content,
                }
            })
        } else{
            nav("/explore",{
                state :{
                    search : false,
                    data : [],
                }
            })
        }
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
