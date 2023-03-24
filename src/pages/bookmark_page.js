import { Link } from "react-router-dom"
import Menu from "../components/menu"
import Logout from "../components/logout"
import Bookmark from "../components/bookmark"
import Add_tw from "../components/add_tw"
import {highlight} from "../script/highlight"
import React, { useEffect } from 'react'

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
        </>

    )
}
export default Bookmark_page;