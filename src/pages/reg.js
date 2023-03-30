import { Link } from "react-router-dom"
import {vis,non_vis} from "../script/log_reg"
const Reg = () =>{
    return (
        <>
            <div className="center">
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
                            <button type="submit" id="log">Register</button>
                        </div>
                        <p>Already have a account? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Reg