import { useCallback, useEffect, useState } from "react";

/**
 * A hook wrapping fetch, just pass the arguments just like the normal fetch function
 * @param {string} url the url used
 * @param {RequestInit} options passed to fetch
 * @param {boolean} manual will it automatically fetch things upon render. If false, the user has to call the makeRequest hook to start a request
 */
export const useFetch = (url, options, manual = false) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const session_pass=
    {
        method: "GET",
        credentials: "include",
    }
    options=Object.assign(options, session_pass)
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
        // if manual is false, that means we want it to be automatic
        if (!manual) {
            makeRequest();
        }
    }, [manual, makeRequest]);

    const resetError = useCallback(() => {
        setError("");
    }, []);

    return { data, isLoading, error, makeRequest, setData, resetError };
};
