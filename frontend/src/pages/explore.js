import React from "react";
import Filter from "../components/filter/filter";
import Search from "../components/search/search";
import { useLocation } from "react-router-dom";

const Explore = () => {
    const location=useLocation();
    
    if (location.state == null){
        location.state={search: false};
    }
    
    return (
        <>
            <Search />
            <Filter search={location.state.search} data={location.state.data} content={location.state.content}/>
        </>
    );
};
export default Explore;
