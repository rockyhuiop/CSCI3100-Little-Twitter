import { BrowserRouter } from "react-router-dom";
// pages & components
import FooterAction from "./components/footerAction/FooterAction";
import MainContent from "./components/MainContent";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import React, { useState, useEffect } from "react";

function App() {
    const [identity, setIdentity] = useState("guest");
    useEffect(() => {
        const checklog = async () => {
            const user = await fetch("/tweet/fetchHomeTweet", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const admin = await fetch("/dashboard", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            if (!user.ok) {
                setIdentity("guest");
            } else if (user.ok) {
                if (admin.ok){
                    setIdentity("admin");
                } else{
                    setIdentity("user");
                }
            }
            console.log(identity)
        };
        checklog();
    }, [identity]);
    return (
        <BrowserRouter>
            <Navbar identity={identity}/>
            <MainContent />
            {/* It is annoying, I will just disable it for a while */}
            <FooterAction identity={identity}/>
        </BrowserRouter>
    );
}

export default App;
