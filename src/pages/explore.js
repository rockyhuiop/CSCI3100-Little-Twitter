import React from "react";
import Add_tw from "../components/add_tw";
import Filter from "../components/filter";
import Hp_foot from "../components/hp_foot";
import Search from "../components/search";
const Explore = () => {
    return (
        <>
            <div className="hp-main">
                <div className="hp-main-con">
                    <Search />
                    <Filter />
                </div>
            </div>
            <Add_tw />
            <Hp_foot />
        </>
    );
};
export default Explore;
