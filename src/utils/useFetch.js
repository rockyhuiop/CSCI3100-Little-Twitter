import { useCallback, useEffect, useState } from "react";

/**
 * A hook wrapping fetch, just pass the arguments just like the normal fetch function
 */
export const useFetch = (url, options, manual = false) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const makeRequest = useCallback(async () => {
        try {
            setError(""); // assume there is no error
            setIsLoading(true);
            const response = await fetch(url, options);
            const json = await response.json();
            if (json.error) {
                setError(json.error);
            } else {
                setData(json.data);
            }
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
        // we assume that the user WILL NOT CHANGE the options
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        if (!manual) {
            makeRequest();
        }
    }, [manual, makeRequest]);

    const resetError = useCallback(() => {
        setError("");
    }, []);

    return { data, isLoading, error, makeRequest, setData, resetError };
};
