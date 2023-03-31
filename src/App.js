import { BrowserRouter } from "react-router-dom";
// pages & components
import FooterAction from "./components/footer/FooterAction";
import MainContent from "./components/MainContent";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <MainContent />
            <FooterAction />
        </BrowserRouter>
    );
}

export default App;
