import { BrowserRouter } from "react-router-dom";
// pages & components
import MainContent from "./components/MainContent";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <MainContent />
            {/* It is annoying, I will just disable it for a while */}
            {/* <FooterAction /> */}
        </BrowserRouter>
    );
}

export default App;
