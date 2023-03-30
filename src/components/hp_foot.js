import {toggle_div} from "../script/toggle_div"
const Hp_foot = () =>{
    return (
    <>
        <div className="hp-foot">
            Login to enjoy more function
            <button 
                id="hp-foot-reg"
                onClick={()=>toggle_div(1,"hp-reg")}
                type="button"
            >
                Register
            </button>
            <button 
                id="hp-foot-log"
                onClick={()=>toggle_div(1,"hp-log")}
                type="button"
            >
                Login
            </button>
        </div>
    </>
    )
} 
export default Hp_foot