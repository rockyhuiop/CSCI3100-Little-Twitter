import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

test("shows the name and follower count", () => {
    const user = {
        name: "Testing",
        followers: new Array(20),
    };
    render(<ProfileHeader user={user} />, { wrapper: MemoryRouter });
    const name = screen.getByText("Testing");
    const followerText = screen.getByText("20", { exact: false });

    expect(name).toBeInTheDocument();
    expect(followerText).toBeInTheDocument();
});
