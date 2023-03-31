import classnames from "classnames";
import styles from "./Button.module.css";

/**
 *
 * A reusable button component
 *
 * scheme?: what colour scheme to use? (primary, secondary etc)
 * text: button text
 * variant?: button style. Outlined or normal button?
 * size?: how big is the button? Supports "small", "medium", "large"
 *
 * scheme will default "primary", variant will default "normal",
 * and size will default "medium"
 */
const Button = ({ scheme, text, variant, size }) => {
    const style = {};

    if (variant === "outlined") {
        style.color = `var(--clr-${scheme})`;
        style.backgroundColor = `var(--clr-white)`;
    } else {
        style.backgroundColor = `var(--clr-${scheme})`;
    }

    return (
        <button
            className={classnames(styles.button, styles[size || "medium"])}
            style={style}
        >
            {text}
        </button>
    );
};

export default Button;
