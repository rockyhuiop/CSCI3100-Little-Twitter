import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../utils/useFetch";

const UsersManagementContext = createContext();

export const useUserMangement = () => {
    return useContext(UsersManagementContext);
};

const UserManagementProvider = ({ children }) => {
    const { data, isLoading, error } = useFetch("/dashboard/");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    const [query, setQuery] = useState("");
    const filtered = useMemo(() => {
        console.log(users, query);
        if (!users) {
            return null;
        }
        // search case insensitive with flag
        // also allow admins to search with regular expressions
        // instead of stupid exact match strings
        const reg = new RegExp(query, "i");
        const filteredUsers = users.filter(
            ({ name, tweetID, _id }) =>
                reg.test(name) || reg.test(tweetID) || reg.test(_id)
        );
        return filteredUsers;
    }, [query, users]);

    const updateUser = (newUserData) => {
        const which = users.findIndex((user) => user._id === newUserData._id);
        if (which !== -1) {
            const copy = [...users];
            copy[which] = newUserData;
            setUsers(copy);
        }
    };

    return (
        <UsersManagementContext.Provider
            value={{
                users,
                isLoading,
                error,
                filtered,
                setQuery,
                query,
                updateUser,
            }}
        >
            {children}
        </UsersManagementContext.Provider>
    );
};

export default UserManagementProvider;
