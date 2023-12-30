import "@testing-library/jest-dom/";
import { screen, render } from "@testing-library/react";
import { LoadingSkeleton } from ".";

describe("LoadingSkelton", () => {
  it("renders loading skeleton corectly", () => {
    render(<LoadingSkeleton />);
    const skeleton = screen.getByRole("list");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders loading skeleton with 5 items", () => {
    render(<LoadingSkeleton numberOfItem={5} />);
    const skeleton = screen.getByRole("list");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.children).toHaveLength(5);
  });
});
