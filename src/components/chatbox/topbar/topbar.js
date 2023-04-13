import "./topbar.css";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import { useUser } from "../../../utils/UserContext";

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <p className="logo">Chatbox</p>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Mail />
                    </div>
                </div>
            </div>
        </div>
    );
}
