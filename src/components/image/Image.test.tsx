import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { Image } from ".";

const imageUrl =
  "https://images.unsplash.com/photo-1531436107035-40b2e85b7a1b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80";

describe("Image", () => {
  it("renders the image correctly", () => {
    render(
      <Image
        unoptimized
        src={imageUrl}
        alt="Test image"
        width={20}
        height={20}
      />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageUrl);
  }),
    it("renders the fallback image correctly", () => {
      render(
        <Image
          unoptimized
          src="/invalid-image.jpg"
          alt="Test image"
          width={20}
          height={20}
        />
      );
      const image = screen.getByRole("img");
      fireEvent.error(image);
      expect(image.getAttribute("src")).toMatch("/avatar.webp");
    });
});
