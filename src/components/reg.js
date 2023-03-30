import {toggle_div} from "../script/toggle_div"
import {auto_grow} from "../script/auto_grow"
import { Link } from "react-router-dom"
import {vis,non_vis} from "../script/log_reg"
const Reg = () =>{
    return(
        <>
            <div className="hp-reg">
                <div className="center hp-popup-click">
                    <div className="hp-reg-box">
                        <div className="row" style={{ height: 24 }}>
                            <button 
                                onClick={()=>toggle_div(0,"hp-reg")} 
                                className="hp-popup-close"
                            >
                                <ion-icon name="close-outline" />
                            </button>
                        </div>
                        <div className="center hp-reg-h">
                            <div className="log-form">
                                <form>
                                    <h2 align="center">Registration</h2>
                                    <div className="log-box">
                                        <input type="text" placeholder=" " required="" />
                                        <label htmlFor="">Username</label>
                                    </div>
                                    <div className="log-box">
                                        <input type="email" placeholder=" " required="" />
                                        <label htmlFor="">E-mail</label>
                                    </div>
                                    <div className="log-box">
                                        <input id="pw" type="password" placeholder=" " required="" />
                                        <label>Password</label>
                                    </div>
                                    <div className="log-box">
                                        <input id="conpw" type="password" placeholder=" " required="" />
                                        <label>Confirm Password</label>
                                        <button
                                            onMouseDown={vis}
                                            onMouseUp={non_vis}
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
                                        <button type="submit" id="log">
                                            Register
                                        </button>
                                    </div>
                                    <p>Already have a account? <Link to="/login">Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Reg