import { useFetch } from "./useFetch";
import { BACK_SER } from './constants';
/**
 * A small wrapper around useFetch
 * For the route /profile/:id
 */
export const useProfile = (id) => {
    const endpoint = id ? BACK_SER+`/profile/${id}` : BACK_SER+"/profile";
    const { data, error, isLoading } = useFetch(endpoint, {
        method: "GET",
        credentials: "include",
    });

    return {
        data,
        error,
        isLoading,
    };
};
