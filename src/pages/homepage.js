import React from "react";
import Add_tw from "../components/add_tw";
import Hp_main from "../components/hp_main";

const Homeapge = () => {
    return (
        <>
            <div className="hp-main">
                <div className="hp-main-con">
                    <Hp_main />
                </div>
            </div>
            <Add_tw />
        </>
    );
};
export default Homeapge;
