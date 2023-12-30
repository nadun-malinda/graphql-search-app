import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
  it('renders a button with the text "Click me"', () => {
    render(<Button text="Click me" />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click me");
  });

  it("renders a button with the text 'Click me' and is disabled", () => {
    render(<Button text="Click me" disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click me");
    expect(button).toBeDisabled();
  });
});
