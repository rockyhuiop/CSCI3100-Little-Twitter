import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserContext";

/**
 * A wrapper around the react-testing render function The render function do not
 * automatically wrap the contexts for us Testers should wrap the components
 * themselves This function reduces the complexity by wrapping it with
 * react-router and the custom user router in advance.
 *
 * @param {JSX.Element} component what component to render
 * @param {string} route where route should react router navigate to when
 * started
 * @returns {{ user: ReturnType<userEvent.setup>} & RenderResult} all the fields of the render function plus a prepared userEvent object
 */
export const renderWithBothContext = (component, route) => {
    // navigate to that route before hand
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
