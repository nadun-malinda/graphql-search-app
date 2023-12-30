import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Card } from ".";

describe("Card", () => {
  it("renders the children correctly", () => {
    render(
      <Card>
        <div>Test</div>
      </Card>
    );
    const div = screen.getByText("Test");
    expect(div).toBeInTheDocument();
  });
});

describe("Card.Header", () => {
  it("renders children correctly", () => {
    render(<Card.Header>Test Header</Card.Header>);
    const header = screen.getByText("Test Header");
    expect(header).toBeInTheDocument();
  });
});

describe("Card.Content", () => {
  it("renders childrenc correctly", () => {
    render(<Card.Content>Test Content</Card.Content>);
    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });
});

describe("Card.Footer", () => {
  it("renders children correctly", () => {
    render(<Card.Footer>Test Footer</Card.Footer>);
    const footer = screen.getByText("Test Footer");
    expect(footer).toBeInTheDocument();
  });
});
