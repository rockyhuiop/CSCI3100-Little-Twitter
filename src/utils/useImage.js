import { useMemo } from "react";
import { dataURIFromBytes } from "./dataURIFromBytes";

/**
 * This hook transforms a file object into base64 uri
 */
export const useImage = (file) => {
    const resource = useMemo(() => {
        return file && dataURIFromBytes(file);
    }, [file]);

    return resource;
};
