import { createContext, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export const ModalContext = createContext({
    onClose: () => {},
    isShowing: false,
});
/**
 * A generic modal container
 * onClose: what to do when the modal closes
 * isShowing: is the modal showing?
 */
const Modal = ({ onClose, isShowing, children }) => {
    // The modal has a black overlay outside of the actual modal box
    // most users expects that when that black overlay is clicked
    // the modal will be closed
    const closeIfBlackAreaClicked = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Pressing escape also quits the modal
    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.body.addEventListener("keydown", keyDownHandler);

        // unregister the key down handler after the modal has been closed
        return () => {
            document.body.removeEventListener("keydown", keyDownHandler);
        };
    }, [onClose]);

    if (!isShowing) {
        return null;
    }

    return createPortal(
        <ModalContext.Provider
            value={{
                isShowing,
                onClose,
            }}
        >
            <div className={styles.wrapper} onClick={closeIfBlackAreaClicked}>
                <div className={styles.modal}>{children}</div>
            </div>
        </ModalContext.Provider>,
        document.body
    );
};

export default Modal;
