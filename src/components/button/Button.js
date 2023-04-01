import classnames from "classnames";
import styles from "./Button.module.css";

/**
 *
 * A reusable button component
 *
 * scheme?: what colour scheme to use? (primary, secondary etc)
 * children: button text
 * variant?: button style. Outlined or normal button?
 * size?: how big is the button? Supports "small", "medium", "large"
 * onClick: click event handler
 * additionalClasses?: optional set of extra class names if needed
 *
 * scheme will default "primary", variant will default "normal",
 * and size will default "medium"
 */
const Button = ({
    scheme,
    children,
    variant,
    size,
    onClick,
    additionalClasses,
}) => {
    if (!scheme) {
        scheme = "primary";
    }

    const buttonClasses = classnames(
        styles.button,
        variant ? styles[`${scheme}-${variant}`] : styles[scheme],
        styles[size] || styles.medium,
        additionalClasses || ""
    );

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
