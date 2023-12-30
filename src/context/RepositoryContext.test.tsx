import { screen, render, fireEvent } from "@testing-library/react";
import {
  RepositoryContext,
  RepositoryContextProvider,
} from "./RepositoryContext";
import { useContext } from "react";

describe("RepositoryContextProvider", () => {
  it("renders the children correctly", () => {
    render(
      <RepositoryContextProvider>
        <h2>Test</h2>
      </RepositoryContextProvider>
    );
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
  });

  it("provides the clickedResults value to its children", () => {
    const TestComponent = () => {
      const { clickedResults } = useContext(RepositoryContext);
      return <h2>{clickedResults.join(",")}</h2>;
    };

    render(
      <RepositoryContextProvider>
        <TestComponent />
      </RepositoryContextProvider>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("");
  });

  it("provides the handleResultClick function to its children", () => {
    const TestComponent = () => {
      const { clickedResults, handleResultClick } =
        useContext(RepositoryContext);
      return (
        <>
          <button onClick={() => handleResultClick("test-id")}>Click me</button>
          <h2>{clickedResults[0]}</h2>
        </>
      );
    };

    render(
      <RepositoryContextProvider>
        <TestComponent />
      </RepositoryContextProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("test-id");
  });

  it("updates the clickedResults array when the handleResultClick function is called", () => {
    const TestComponent = () => {
      const { clickedResults, handleResultClick } =
        useContext(RepositoryContext);
      return (
        <>
          <button onClick={() => handleResultClick("test-id")}>Click me</button>
          <h2>{clickedResults.join(",")}</h2>
        </>
      );
    };

    render(
      <RepositoryContextProvider>
        <TestComponent />
      </RepositoryContextProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("test-id");

    fireEvent.click(button);
    expect(heading).toHaveTextContent("");
  });

  it("clears the clickedResults array when the clearClickedResults function is called", () => {
    const TestComponent = () => {
      const { clickedResults, clearClickedResults } =
        useContext(RepositoryContext);
      return (
        <>
          <button onClick={() => clearClickedResults()}>Click me</button>
          <h2>{clickedResults.join(",")}</h2>
        </>
      );
    };

    render(
      <RepositoryContextProvider>
        <TestComponent />
      </RepositoryContextProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("");
  });
});
