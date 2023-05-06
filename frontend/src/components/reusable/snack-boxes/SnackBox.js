import classnames from "classnames";
import { forwardRef } from "react";
import styles from "./SnackBox.module.css";

const SnackBox = forwardRef(({ children, variant }, ref) => {
    return (
        <div
            className={classnames(styles.container, styles[variant])}
            ref={ref}
        >
            {children}
        </div>
    );
});

export default SnackBox;
