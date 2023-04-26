import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserContext";

export const renderWithBothContext = (component, route) => {
    window.history.pushState({}, "", route);
    return {
        user: userEvent.setup(),
        ...render(component, {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <UserProvider>{children}</UserProvider>
                </BrowserRouter>
            ),
        }),
    };
};
