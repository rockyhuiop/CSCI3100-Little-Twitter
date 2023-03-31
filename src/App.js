import { BrowserRouter } from "react-router-dom";
// pages & components
import Hp_foot from "./components/hp_foot";
import MainContent from "./components/MainContent";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <MainContent />
            <Hp_foot />
        </BrowserRouter>
    );
}

export default App;
