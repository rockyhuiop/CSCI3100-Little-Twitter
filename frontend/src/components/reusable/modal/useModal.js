import { useState } from "react";

/**
 * A custom hook for manaing modal states
 * @returns isShowing, onOpen (open modal), onClose (close modal)
 */
export const useModal = () => {
    // a state for managing edit profile modal open and close
    const [isShowing, setIsShowing] = useState(false);

    const onOpen = () => {
        setIsShowing(true);
    };

    const onClose = () => {
        setIsShowing(false);
    };

    return { isShowing, onOpen, onClose };
};
