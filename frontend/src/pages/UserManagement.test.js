import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithBothContext } from "../utils/renderWrappers";
import UserManagement from "./UserManagement";

const mockUsers = (data) => {
    jest.spyOn(window, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => {
                return Promise.resolve({
                    data,
                });
            },
        })
    );
};

describe("user management page", () => {
    test("shows correct amount of users", async () => {
        mockUsers([
            {
                tweetID: "1",
                name: "User 1",
                _id: "1",
            },
            {
                tweetID: "2",
                name: "User 2",
                _id: "2",
            },
        ]);
        renderWithBothContext(<UserManagement />, "/manage/users");
        const rows = within(
            await screen.findByTestId("users-table")
        ).getAllByRole("row");
        expect(rows).toHaveLength(2);
    });

    test("search users work correcty", async () => {
        mockUsers([
            {
                tweetID: "1",
                name: "abcde",
                _id: "1",
            },
            {
                tweetID: "2",
                name: "fghijklmn",
                _id: "2",
            },
        ]);
        renderWithBothContext(<UserManagement />, "/manage/users");
        const searchBar = await screen.findByRole("search");
        const user = userEvent.setup();
        await user.type(searchBar, "a");
        const rows = within(
            await screen.findByTestId("users-table")
        ).getAllByRole("row");
        expect(rows).toHaveLength(1); // only the first one is shown
        await user.type(searchBar, "{Backspace}");
        const updatedRows = within(
            await screen.findByTestId("users-table")
        ).getAllByRole("row");
        expect(updatedRows).toHaveLength(2); // return to normal
    });

    test("remove a user", async () => {
        mockUsers([
            {
                tweetID: "1",
                name: "abcde",
                _id: "1",
            },
            {
                tweetID: "2",
                name: "fghijklmn",
                _id: "2",
            },
        ]);
        renderWithBothContext(<UserManagement />, "/manage/users");
        const rows = within(
            await screen.findByTestId("users-table")
        ).getAllByRole("row");
        const user = userEvent.setup();
        const firstRowActions = within(rows[0]).getByRole("button"); // click on the three dots on the right
        await user.click(firstRowActions);
        const button = screen.getByText("Remove"); // it should show options like "Edit" and "Remove"
        await user.click(button);
        const deleteButton = screen.getByRole("button"); // a confirmation modal shows
        await user.click(deleteButton); // click on the delete button
        const updatedRows = within(
            await screen.findByTestId("users-table")
        ).getAllByRole("row");
        expect(updatedRows).toHaveLength(1); // should have one fewer user
    });
});
