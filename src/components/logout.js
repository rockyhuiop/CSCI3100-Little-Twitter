import {show_pop} from "../script/show_pop"
const Logout = () =>{
    return(
        <div className="hp-rest">
            <div className="right-h">
                <div className="hp-logout">
                    <span className="hp-logout-text" id="hp-logout-pop">
                        Logout
                    </span>
                    <button type="button" className="hp-menu-button" onClick={()=>show_pop()}>
                        <img className="user-icon" src="/media/default.jpg" width={24} /> LTW001
                        <ion-icon id="hp-down" name="chevron-down-outline" />
                        <ion-icon
                            id="hp-up"
                            style={{ display: "none" }}
                            name="chevron-up-outline" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Logout