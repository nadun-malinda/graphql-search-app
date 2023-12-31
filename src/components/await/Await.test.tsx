import { render, screen } from "@testing-library/react";
import { Await } from ".";

describe("Await", () => {
  it("should render the children with the resolved value", async () => {
    const promise = Promise.resolve("test");
    const children = (value: string) => <div>{value}</div>;

    const element = await Await({ promise, children });
    render(element);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should handle rejected promises", async () => {
    const promise = Promise.reject(new Error("error"));
    const children = (value: string) => <div>{value}</div>;

    await expect(Await({ promise, children })).rejects.toThrow("error");
  });
});
