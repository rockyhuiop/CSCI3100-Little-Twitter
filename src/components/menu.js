import { Link } from "react-router-dom"
import { Home, MessageSquare, Hash, Bookmark, User } from 'react-feather';
import {toggle_div} from "../script/toggle_div"
import {file_path} from "../script/file_path"
import {detect} from "../script/detect"
import React, { useEffect } from 'react'
const Menu = () =>{
    useEffect(()=>{

  
        window.addEventListener('click', detect)
        file_path();
        }, [])
    return(
        <div className="hp-menu">
            <Link to="/">
                <button type="button" id="hp-menu-hp" className="hp-menu-button">
                    <Home className="hp-menu-icon" />
                    Homepage
                </button>
            </Link>
            <Link to="/explore">
                <button type="button" id="hp-menu-ex" className="hp-menu-button">
                    <Hash className="hp-menu-icon" />
                    Explore
                </button>
            </Link>
            <Link to="/bookmark">
                <button type="button" id="hp-menu-bm" className="hp-menu-button">
                    <Bookmark className="hp-menu-icon" />
                    Bookmark
                </button>
            </Link>
            <Link to="">
                <button type="button" id="hp-menu-ms" className="hp-menu-button">
                    <MessageSquare className="hp-menu-icon" />
                    Message
                </button>
            </Link>
            <Link to="">
                <button type="button" id="hp-menu-pr" className="hp-menu-button">
                    <User className="hp-menu-icon" />
                    Profile
                </button>
            </Link>
            <button
                onClick={()=>toggle_div(1,"hp-addtw")}
                type="button"
                id="hp-menu-at"
                className="hp-menu-button hp-tweet"
                style={{ textAlign: "center" }}
            >
                Add tweet
            </button>
        </div>
    )
}
export default Menu