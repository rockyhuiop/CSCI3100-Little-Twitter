import { toggle_div } from "../../script/toggle_div";
import { useState, createContext } from 'react'
import styles from "./FooterAction.module.css";
import Login from "../login";
import Reg from "../reg";

export const FormContext = createContext({
    FormActive: "",
    openLog: () => {},
    openReg: () => {},
    closeAll: () => {}
});

const FooterAction = () => {
    const [FormActive, setFormActive] = useState("log")

    const openLog = () => {
        setFormActive("log");
    };

    const openReg = () => {
        setFormActive("reg");
    };

    const closeAll = () => {
        setFormActive("");
    };

    return (
        <>
            <FormContext.Provider
                value={{
                    FormActive,
                    openLog,
                    openReg,
                    closeAll
                }}
            >
                <div className={styles.footer}>
                    <p>Login to enjoy more function</p>
                    <div className={styles["button-group"]}>
                        <button
                            id="hp-foot-log"
                            onClick={openLog}
                        >
                            Login
                        </button>
                        <button
                            id="hp-foot-reg"
                            onClick={openReg}
                        >
                            Register
                        </button>
                        
                    </div>
                </div>
                {FormActive=="log" ? <Login /> : FormActive=="reg" ? <Reg /> : ""}
            </FormContext.Provider>
        </>
    );
};
export default FooterAction;
