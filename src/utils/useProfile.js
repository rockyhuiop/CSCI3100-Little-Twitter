import { useFetch } from "./useFetch";

export const useProfile = (id) => {
    const endpoint = id ? `/profile/${id}` : "/profile";
    const { data, error, isLoading } = useFetch(endpoint, {});

    return {
        data,
        error,
        isLoading,
    };
};
