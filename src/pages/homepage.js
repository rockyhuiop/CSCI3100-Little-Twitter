import { Link } from "react-router-dom"
import Menu from "../components/menu"
import Logout from "../components/logout"
import Hp_main from "../components/hp_main"
import Add_tw from "../components/add_tw"
import Hp_foot from "../components/hp_foot"
import {highlight} from "../script/highlight"
import React, { useEffect } from 'react'
import Login from "../components/login"
import Reg from "../components/reg"

const Homeapge = () =>{
    useEffect(()=>{

        highlight("hp-menu-hp");    
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
            <Login />
            <Reg />
            <Hp_foot />
        </>

    )
}
export default Homeapge;