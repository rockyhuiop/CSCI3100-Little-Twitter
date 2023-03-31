import React from "react";
import Add_tw from "../components/add_tw";
import Bookmark from "../components/bookmark";
import Hp_foot from "../components/hp_foot";

const Bookmark_page = () => {
    return (
        <>
            <div className="hp-main">
                <div className="hp-main-con">
                    <Bookmark />
                </div>
            </div>
            <Add_tw />
            <Hp_foot />
        </>
    );
};
export default Bookmark_page;
