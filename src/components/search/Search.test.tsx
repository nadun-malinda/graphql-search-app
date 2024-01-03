import { fireEvent, render, screen } from "@testing-library/react";
import { Search } from ".";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
  usePathname: jest.fn(),
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

describe("Search", () => {
  it("should render the search input", () => {
    render(<Search focusOnLoad />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should focus on the input when the component mounts with focusOnLoad prop", () => {
    render(<Search focusOnLoad />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });

  it("should not focus on the input when the component mounts without focusOnLoad prop", () => {
    render(<Search />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveFocus();
  });

  it("should render the input with correct placeholder text", () => {
    render(<Search placeholder="Search for a GitHub repository..." />);
    const input = screen.getByPlaceholderText(
      "Search for a GitHub repository..."
    );
    expect(input).toBeInTheDocument();
  });

  it("should disable the search reset button when the input is empty", () => {
    render(<Search />);
    const searchResetButton = screen.getByRole("button", { name: "x" });
    expect(searchResetButton).toBeDisabled();
  });

  it("should enabel the  search reset button when the input is not empty", () => {
    render(<Search />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "react" } });

    const searchResetButton = screen.getByRole("button", { name: "x" });
    expect(searchResetButton).toBeEnabled();
  });

  it("should reste the input field when the search reset button is clicked", () => {
    render(<Search />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "react" } });

    const searchResetButton = screen.getByRole("button", { name: "x" });
    fireEvent.click(searchResetButton);

    expect(input).toHaveValue("");
  });
});
