import qs from "qs";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProfileAndSetUser = async () => {
        console.log("[UserContext] fetching user profile...");
        setIsLoading(true);
        const profile = await fetch("/profile");
        // probably because the user is unauthorized
        if (!profile.ok) {
            setIsLoading(false);
            return;
        }
        const profileJSON = await profile.json();
        setUser(profileJSON.data);
        setIsLoading(false);
    };

    // returns null if successful, the error message if not successful
    const login = async (values) => {
        const response = await fetch("/login", {
            method: "POST",
            body: qs.stringify(values),
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });
        const json = await response.json();
        if (json.error) {
            return json.error;
        }
        fetchProfileAndSetUser();
        console.log("[UserContext] user has logged in and got his profile.");
        return null;
    };

    const logout = async () => {
        const response = await fetch("/logout");
        if (response.ok) {
            console.log("[UserContext] user has logged out");
            setUser(null);
        } else {
            console.error("[UserContext] cannot logout user!");
        }
    };

    useEffect(() => {
        fetchProfileAndSetUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                login,
                logout,
                user,
                setUser,
                isProfileLoading: isLoading,
                isLoggedIn: user !== null,
                isAdmin: user && user.userType === "admin",
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
