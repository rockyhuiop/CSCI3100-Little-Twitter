import { Link } from "react-router-dom"
import Menu from "../components/menu"
import Logout from "../components/logout"
import Bookmark from "../components/bookmark"
import Add_tw from "../components/add_tw"
import {highlight} from "../script/highlight"
import React, { useEffect } from 'react'
import Hp_foot from "../components/hp_foot"

const Bookmark_page = () =>{
    useEffect(()=>{

        highlight("hp-menu-bm");    
        
        }, [])
    return (
        <>
            <Menu />
            <Logout />
            <div className="hp-main">
                <div className="hp-main-con">
                    <Bookmark />
                </div>
            </div>
            <Add_tw />
            <Hp_foot />
        </>

    )
}
export default Bookmark_page;