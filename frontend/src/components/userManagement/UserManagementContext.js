import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../utils/useFetch";

const UsersManagementContext = createContext();

// convenience hook
export const useUserMangement = () => {
    return useContext(UsersManagementContext);
};

const UserManagementProvider = ({ children }) => {
    // dashboard fetches a list of users
    const { data, isLoading, error } = useFetch("/dashboard/");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    // this will be supplied to the search bar
    const [query, setQuery] = useState("");
    // it will cache the filtered results...
    const filtered = useMemo(() => {
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

    // after editing profile, reflect the changes in the user interface
    const updateUser = (newUserData) => {
        const which = users.findIndex((user) => user._id === newUserData._id);
        if (which !== -1) {
            const copy = [...users];
            copy[which] = newUserData;
            setUsers(copy);
        }
    };

    // after deleting a user, reflect the changes in the user interface
    const removeUser = (_id) => {
        const copy = users.filter((user) => user._id !== _id);
        setUsers(copy);
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
                removeUser,
            }}
        >
            {children}
        </UsersManagementContext.Provider>
    );
};

export default UserManagementProvider;
