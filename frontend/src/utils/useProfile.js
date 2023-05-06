import { useFetch } from "./useFetch";

/**
 * A small wrapper around useFetch
 * For the route /profile/:id
 */
export const useProfile = (id) => {
    const endpoint = id ? `/profile/${id}` : "/profile";
    const { data, error, isLoading } = useFetch(endpoint, {});

    return {
        data,
        error,
        isLoading,
    };
};
