import { toggle_div } from "../../script/toggle_div";
import styles from "./FooterAction.module.css";

const FooterAction = () => {
    return (
        <div className={styles.footer}>
            <p>Login to enjoy more function</p>
            <div className={styles["button-group"]}>
                <button
                    id="hp-foot-reg"
                    onClick={() => toggle_div(1, "hp-reg")}
                >
                    Register
                </button>
                <button
                    id="hp-foot-log"
                    onClick={() => toggle_div(1, "hp-log")}
                >
                    Login
                </button>
            </div>
        </div>
    );
};
export default FooterAction;
