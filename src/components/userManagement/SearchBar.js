import { useRef } from "react";
import { Search } from "react-feather";
import styles from "./SearchBar.module.css";
import { useUserMangement } from "./UserManagementContext";

const SearchBar = () => {
    const ref = useRef(null);
    const { setQuery, query } = useUserMangement();

    /*
      The user does not know that this component
      in fact is a div with a input bar.
      So they may click outside the input and expect
      the input bar to be focused.
      This makes sure that when the div is clicked
      The actual input will be focused
    */
    const onClick = () => {
        ref.current.focus();
    };

    const onInputChange = (text) => {
        setQuery(text);
    };

    return (
        <div className={styles.bar} onClick={onClick}>
            <Search />
            <input
                placeholder={"Search Users"}
                ref={ref}
                onChange={(e) => onInputChange(e.target.value)}
                value={query}
            />
        </div>
    );
};

export default SearchBar;
