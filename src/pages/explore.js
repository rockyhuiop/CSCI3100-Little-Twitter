import { Link } from "react-router-dom"
import Menu from "../components/menu"
import Logout from "../components/logout"
import Filter from "../components/filter"
import Add_tw from "../components/add_tw"
import Search from "../components/search"
import {highlight} from "../script/highlight"
import React, { useEffect } from 'react'
import Hp_foot from "../components/hp_foot"
const Explore = () =>{
    useEffect(()=>{

        highlight("hp-menu-ex");    
        
        }, [])
    return (
        <>
            <Menu />
            <Logout />
            <div className="hp-main">
                <div className="hp-main-con">
                    <Search />
                    <Filter />
                </div>
            </div>
            <Add_tw />
            <Hp_foot />
        </>

    )
}
export default Explore;