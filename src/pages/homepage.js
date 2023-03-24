import { Link } from "react-router-dom"
import Menu from "../components/menu"
import Logout from "../components/logout"
import Hp_main from "../components/hp_main"
import Add_tw from "../components/add_tw"
import {highlight} from "../script/highlight"
import {detect} from "../script/detect"
import {file_path} from "../script/file_path"
import React, { useEffect } from 'react'

const Homeapge = () =>{
    useEffect(()=>{

        highlight("hp-menu-hp");    
        window.addEventListener('click', detect)
        file_path();
        }, [])
    
    return (
        <>
        <Menu />
        <Logout />
        <div className="hp-main">
            <div className="hp-main-con">
                <Hp_main />
            </div>
        </div>
        <Add_tw />
        </>

    )
}
export default Homeapge;