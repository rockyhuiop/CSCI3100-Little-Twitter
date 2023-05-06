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
 * type?: if it is a normal button, this field can be empty
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
    type,
    additionalClasses,
}) => {
    if (!scheme) {
        scheme = "primary";
    }

    // see Button.module.css for the class names
    const buttonClasses = classnames(
        styles.button,
        // use primary colour scheme by default
        variant ? styles[`${scheme}-${variant}`] : styles[scheme],
        styles[size] || styles.medium, // use medium size by the default
        additionalClasses || ""
    );

    return (
        <button className={buttonClasses} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
