import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithBothContext } from "../../utils/renderWrappers";
import Login from "./Login";

const mockResponses = (data, status = 200) => {
    jest.spyOn(window, "fetch").mockImplementation((url) => {
        // set user to be not logged in when testing this component
        if (url === "/profile") {
            return { ok: false };
        }

        return {
            status,
            json: () => {
                return Promise.resolve(data);
            },
        };
    });
};

describe("invalid inputs", () => {
    test("empty fields should give error", async () => {
        mockResponses({});
        const onClose = jest.fn();
        renderWithBothContext(
            <Login isShowing={true} onClose={onClose} />,
            "/"
        );
        const submit = screen.getByRole("button", { name: "Submit" });
        const user = userEvent.setup();
        await user.click(submit);
        const requiredErrors = screen.getAllByText(/required/);
        expect(requiredErrors).toHaveLength(2); // username and password is empty
        expect(onClose).not.toBeCalled();
    });
});

describe("valid but not in database", () => {
    test("user does not exist", async () => {
        mockResponses(
            {
                error: "User doesn't exist!",
            },
            401
        );
        const onClose = jest.fn();
        renderWithBothContext(
            <Login isShowing={true} onClose={onClose} />,
            "/"
        );
        const tweetIDField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const submit = screen.getByRole("button", { name: "Submit" });
        const user = userEvent.setup();
        await user.type(tweetIDField, "random text");
        await user.type(passwordField, "random password");
        await user.click(submit);
        const error = screen.getByText(/exist/);
        expect(error).toBeInTheDocument();
        expect(onClose).not.toBeCalled();
    });

    test("user exists, but the password is wrong", async () => {
        mockResponses(
            {
                error: "password doesn't match",
            },
            401
        );
        const onClose = jest.fn();
        renderWithBothContext(
            <Login isShowing={true} onClose={onClose} />,
            "/"
        );
        const tweetIDField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const submit = screen.getByRole("button", { name: "Submit" });
        const user = userEvent.setup();
        await user.type(tweetIDField, "random text");
        await user.type(passwordField, "random password");
        await user.click(submit);
        const error = screen.getByText(/match/);
        expect(error).toBeInTheDocument();
        expect(onClose).not.toBeCalled();
    });
});

describe("login is successful", () => {
    test("user does not exist", async () => {
        mockResponses({
            state: "Success",
            data: {}, // it should be an user object but I am too lazy to fill
        });
        const onClose = jest.fn();
        renderWithBothContext(
            <Login isShowing={true} onClose={onClose} />,
            "/"
        );
        const tweetIDField = screen.getByLabelText(/Email/);
        const passwordField = screen.getByLabelText(/Password/);
        const submit = screen.getByRole("button", { name: "Submit" });
        const user = userEvent.setup();
        await user.type(tweetIDField, "correct text");
        await user.type(passwordField, "correct password");
        await user.click(submit);
        expect(onClose).toBeCalled(); // close the modal after logging in
    });
});
