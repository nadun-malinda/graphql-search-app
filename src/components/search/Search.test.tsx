import { render, screen } from "@testing-library/react";
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
});
