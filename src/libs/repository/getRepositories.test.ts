import { getRepositories } from ".";
import { graphQLClient } from "../graphql/client/graphQLClient";

jest.mock("../graphql/client/graphQLClient");

describe("getRepositories", () => {
  it("should return early if searchText is empty", async () => {
    const searchText = "";
    const result = await getRepositories(searchText);
    expect(result).toEqual({
      repositories: null,
      isLoading: false,
      error: null,
    });
  });
});
