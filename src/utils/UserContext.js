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

const UserContext = createContext({});

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({
        variant: "",
        message: "",
    });

    const handleClose = () => {
        setOpen(false);
    };

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

    const register = async (values) => {
        try {
            const response = await fetch("/registration", {
                method: "POST",
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
        } catch (err) {
            return err;
        }
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
        setMessage({
            variant: "success",
            message: "Logged In.",
        });
        setOpen(true);
        console.log("[UserContext] user has logged in and got his profile.");
        return null;
    };

    const logout = async () => {
        const response = await fetch("/logout");
        if (response.ok) {
            console.log("[UserContext] user has logged out");
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
                    isProfileLoading: isLoading,
                    isLoggedIn: user !== null,
                    isAdmin: user && user.userType === "admin",
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
