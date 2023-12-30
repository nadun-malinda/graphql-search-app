import { graphQLClient } from "./graphQLClient";
import fetchMock from "jest-fetch-mock";
import { GET_REPOSITORIES } from "../queries/repository";

describe("graphQLClient", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("returns data when the request is successful", async () => {
    const mockData = {
      search: {
        edges: [
          {
            node: {
              description:
                "Data modeling and relation library for testing JavaScript applications.",
              id: "MDEwOlJlcG9zaXRvcnkzMTk2MTkzMjI=",
              name: "data",
              nameWithOwner: "mswjs/data",
              owner: {
                avatarUrl:
                  "https://avatars.githubusercontent.com/u/64637271?v=4",
                login: "mswjs",
              },
              stargazerCount: 689,
            },
          },
        ],
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));

    const response = await graphQLClient(GET_REPOSITORIES, {
      variables: { query: "test data", limit: 1 },
    });
    expect(response.data).toEqual(mockData);
    expect(response.isLoading).toBe(false);
    expect(response.error).toBe(null);
  });
});
