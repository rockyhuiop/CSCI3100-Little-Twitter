import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProfileModal from "./EditProfileModal";

describe("invalid inputs", () => {
    test("leaving the username blank does not allow submission", async () => {
        const userObj = {
            name: "Hello",
            biogrpahy: "",
        };
        render(
            <EditProfileModal
                onClose={() => {}}
                isShowing={true}
                user={userObj}
            />
        );
        const user = userEvent.setup();
        const nameInput = screen.getByLabelText("Username");
        await user.clear(nameInput);
        const submit = screen.getByRole("button", { name: /save/i });
        await user.click(submit);
        const requiredError = screen.getByText(/required/);
        expect(requiredError).toBeInTheDocument();
    });
});

describe("submitting form with no name collision", () => {
    test("new name passes", async () => {
        jest.spyOn(window, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({
                        data: {
                            name: "changed",
                        },
                    });
                },
            })
        );

        const userObj = {
            name: "Hello",
            biogrpahy: "",
        };
        const editCallbackMock = jest.fn();
        render(
            <EditProfileModal
                onClose={() => {}}
                isShowing={true}
                user={userObj}
                editCallback={editCallbackMock}
            />
        );
        const user = userEvent.setup();
        const nameInput = screen.getByLabelText("Username");
        await user.clear(nameInput);
        await user.type(nameInput, "changed");
        const submit = screen.getByRole("button", { name: /save/i });
        await user.click(submit);
        expect(editCallbackMock).toHaveBeenCalled();
    });
});
