import {toggle_div} from "../script/toggle_div"
import { Link } from "react-router-dom";
import {vis,non_vis} from "../script/log_reg"
import {auto_grow} from "../script/auto_grow"
const Login = () =>{
    return(
        <>
            <div className="hp-log">
                <div className="center hp-popup-click">
                    <div className="hp-log-box">
                        <div className="row" style={{ height: 24 }}>
                            <button 
                                onClick={()=>toggle_div(0,"hp-log")} 
                                className="hp-popup-close"
                            >
                                <ion-icon name="close-outline" />
                            </button>
                        </div>
                        <div className="center hp-log-h">
                            <div className="log-form">
                                <form>
                                    <h2 align="center">Login</h2>
                                    <div className="log-box">
                                        <input type="text" placeholder=" " required="" />
                                        <label htmlFor="">Username</label>
                                    </div>
                                    <div className="log-box">
                                        <input id="logpw" type="password" placeholder=" " required="" />
                                        <label>Password</label>
                                        <button
                                            onMouseDown={()=>vis("log")}
                                            onMouseUp={()=>non_vis("log")}
                                            type="button"
                                            id="eye"
                                        >
                                            <ion-icon 
                                                id="open"
                                                style={{ display: "block" }} 
                                                name="eye-outline" 
                                            />
                                            <ion-icon
                                                id="close"
                                                style={{ display: "none" }}
                                                name="eye-off-outline"
                                            />
                                        </button>
                                    </div>
                                    <div className="log-box">
                                        <button id="log">Login</button>
                                    </div>
                                    <p>Do not have a account? <Link to="/reg">Register</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login