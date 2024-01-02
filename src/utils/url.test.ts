import { generateUrlSearchString } from "./url";

describe("generateUrlSearchString", () => {
  it("should generate URL search string with the given query", () => {
    const query = "test";
    const result = generateUrlSearchString(query);
    expect(result).toBe("?search=test");
  });

  it("should generate empty URL search string if the given query is null", () => {
    const query = null;
    const result = generateUrlSearchString(query);
    expect(result).toBe("");
  });
});
