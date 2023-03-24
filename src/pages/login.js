
import { Link } from "react-router-dom";
import {vis,non_vis} from "../script/log_reg"
const Login = () => {


    return (
        <>
        
        <div className="center">
          <div className="log-form">
            <form>
              <h2 align="center">Login</h2>
              <div className="log-box">
                <input type="text" placeholder=" " required="" />
                <label htmlFor="">Username</label>
              </div>
              <div className="log-box">
                <input id="pw" type="password" placeholder=" " required="" />
                <label>Password</label>
                <button
                  onMouseDown={vis}
                  onMouseUp={non_vis}
                  type="button"
                  id="eye"
                >
                  <ion-icon id="open" name="eye-outline" />
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
              <p>
                Do not have a account? <Link to="/reg">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </>
    )
} 
export default Login
