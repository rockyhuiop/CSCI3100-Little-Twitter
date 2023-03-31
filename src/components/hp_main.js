import tweet from "../assets/tweet.png";
import Search from "./search";

const Hp_main = () => {
    return (
        <>
            <Search />
            <div className="hp-tweet-item">
                <img src={tweet} />
            </div>
        </>
    );
};
export default Hp_main;
