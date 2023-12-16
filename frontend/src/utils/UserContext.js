import { Snackbar } from "@mui/material";
import qs from "qs";
import {
    createContext,
    Fragment,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import SnackBox from "../components/reusable/snack-boxes/SnackBox";
import { BACK_SER } from "./constants";

const UserContext = createContext({});

// convenience hook
export const useUser = () => {
    return useContext(UserContext);
};

/**
 * User context contains the authentication flow of this program
 * Returns the current logged in user and other goodies.
 */
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // navigate to the profile page upon login
    const navigate = useNavigate();
    // for the notification below
    const [open, setOpen] = useState(false);
    // any kind of fetch error
    const [error, setError] = useState(false);
    // for the notification below
    const [message, setMessage] = useState({
        variant: "",
        message: "",
    });

    // close the modal
    const handleClose = () => {
        setOpen(false);
    };

    // fetch the full user using the /profile route
    const fetchProfileAndSetUser = async () => {
        // console.log("[UserContext] fetching user profile...");
        setIsLoading(true);
        setError(null);
        try {
            const profile = await fetch(BACK_SER+"/profile",{
                method: "GET",
                credentials: "include",
            });
            // probably because the user is unauthorized
            if (!profile.ok) {
                setIsLoading(false);
                return;
            }
            const profileJSON = await profile.json();
            setUser(profileJSON.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
        }
    };

    // submit the form to /registration
    const register = async (values) => {
        try {
            const response = await fetch(BACK_SER+"/registration", {
                method: "POST",
                credentials: "include",
                body: qs.stringify(values),
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error);
            }
            setMessage({
                variant: "success",
                message: "User registered. Now you can login to the account.",
            });
            setOpen(true);
            return null;
        } catch (error) {
            return error;
        }
    };

    // submit the form to /login
    // returns null if successful, the error message if not successful
    const login = async (values) => {
        const response = await fetch(BACK_SER+"/login", {
            method: "POST",
            credentials: "include",
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
        setMessage({
            variant: "success",
            message: "Logged In.",
        });
        setOpen(true);
        // console.log("[UserContext] user has logged in and got his profile.");
        return null;
    };

    // /logout will take care of the cookie
    // navigates to the home page after logging out
    const logout = async () => {
        const response = await fetch(BACK_SER+"/logout",{
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            // console.log("[UserContext] user has logged out");
            setUser(null);
            setMessage({ variant: "success", message: "Logged out" });
            navigate("/");
            window.location.reload(true);
        } else {
            console.error("[UserContext] cannot logout user!");
            setMessage({
                variant: "danger",
                message: "Cannot log out user due to some errors",
            });
        }
        setOpen(true);
    };

    useEffect(() => {
        // automatically try to fetch the current user
        // if there is no logged in user, it does nothing
        fetchProfileAndSetUser();
    }, []);

    return (
        <Fragment>
            <UserContext.Provider
                value={{
                    login,
                    logout,
                    register,
                    user,
                    setUser,
                    isLoading,
                    isLoggedIn: user !== null,
                    isAdmin: user && user.userType === "admin",
                    refreshUser: fetchProfileAndSetUser,
                    error,
                }}
            >
                {children}
            </UserContext.Provider>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <SnackBox variant={message.variant}>{message.message}</SnackBox>
            </Snackbar>
        </Fragment>
    );
};

export default UserProvider;
