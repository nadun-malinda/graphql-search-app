import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Error } from ".";

describe("Error", () => {
  it("renders the error messgage correctly", () => {
    render(<Error message="Error message" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
