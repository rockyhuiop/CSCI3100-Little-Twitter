import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

test("should show gradient banner when no image", () => {
    const user = {};
    render(<Banner user={user} />);
    // ugh this is the worst. Here I am trying to get a div...
    const gradient = screen.getByRole("generic", { name: "banner" });
    expect(gradient).toHaveClass("gradient-banner");
});

test("should have background image when there is a link", () => {
    const user = {
        banner: "/image-2150251208.png",
    };
    render(<Banner user={user} />);
    const gradient = screen.getByRole("generic", { name: "banner" });
    expect(gradient).not.toHaveClass("gradient-banner");
});
