import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithBothContext } from "../utils/renderWrappers";
import Profile from "./Profile";

describe("logged in", () => {
    test("it works!", async () => {
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
});
