import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithBothContext } from "../utils/renderWrappers";
import Profile from "./Profile";

describe("logged in", () => {
    test("loading the logged in user's profile", async () => {
        // absolutely horrible: if there are better ways please tell me.
        jest.spyOn(window, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({
                        data: {
                            name: "Test",
                            tweetID: "TestingID",
                            followers: [],
                            followings: [],
                        },
                    });
                },
            })
        );

        renderWithBothContext(<Profile />, "/profile");
        const tweetID = await screen.findByText("@TestingID");
        expect(tweetID).toBeInTheDocument();
        expect(screen.queryByText(/no profile/)).not.toBeInTheDocument();
    });

    // add more tests later
    test("loading others profile", async () => {
        jest.spyOn(window, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({
                        data: {
                            name: "New",
                            tweetID: "New",
                            followers: [],
                            followings: [],
                        },
                    });
                },
            })
        );

        renderWithBothContext(<Profile />, "/profile/New");
        const tweetID = await screen.findByText("@New");
        expect(tweetID).toBeInTheDocument();
    });
});

describe("not logged in", () => {
    test("should not show profile", async () => {
        // absolutely horrible: if there are better ways please tell me.
        jest.spyOn(window, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: false,
                json: () => {
                    return Promise.resolve({ erorr: "Not Logged In" });
                },
            })
        );

        renderWithBothContext(<Profile />, "/profile");
        expect(await screen.findByText(/no profile/)).toBeInTheDocument();
    });

    // add more tests later
    test("still loads others' profile without loggin in", async () => {
        jest.spyOn(window, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({
                        data: {
                            name: "New",
                            tweetID: "New",
                            followers: [],
                            followings: [],
                        },
                    });
                },
            })
        );

        renderWithBothContext(<Profile />, "/profile/New");
        const tweetID = await screen.findByText("@New");
        expect(tweetID).toBeInTheDocument();
    });
});
