import { generateUrlSearchString } from "./url";

describe("generateUrlSearchString", () => {
  it("should generate URL search string with the given query", () => {
    const query = "test";
    const result = generateUrlSearchString(query);
    expect(result).toBe("?search=test");
  });
});
