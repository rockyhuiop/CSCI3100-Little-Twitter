import { BrowserRouter } from "react-router-dom";
// pages & components
import React from "react";
import FooterAction from "./components/footerAction/FooterAction";
import MainContent from "./components/MainContent";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import UserProvider from "./utils/UserContext";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Navbar />
                <MainContent />
                <FooterAction />
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
