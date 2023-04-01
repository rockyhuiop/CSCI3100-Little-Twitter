import { useRef } from "react";
import { Search } from "react-feather";
import styles from "./SearchBar.module.css";

/**
 *  Custom search input... with a div
 *  used in admin pages
 *
 *  placeholder?: placeholder text for the input
 *  onInputChange: lifting state up
 *  value: as it is controlled by parent, value is also needed
 */
const SearchBar = ({ placeholder, onInputChange, value }) => {
    const ref = useRef(null);

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

    return (
        <div className={styles.bar} onClick={onClick}>
            <Search />
            <input
                placeholder={placeholder}
                ref={ref}
                onChange={(e) => onInputChange(e.target.value)}
                value={value}
            />
        </div>
    );
};

export default SearchBar;
