import { HttpResponse, graphql } from "msw";

import { allRepositories } from "@/tests/mocks/handlers";
import { server } from "@/tests/mocks/server";

import { ERR_MESSAGE_GRAPHQL } from "@/constants";
import { getRepositories } from ".";

describe("getRepositories", () => {
  it("should return matching repositories", async () => {
    const repositories = await getRepositories("react");

    expect(repositories).toEqual({
      repositories: allRepositories.search.edges.map((edge) => edge.node),
      isLoading: false,
      error: null,
    });
  });

  it("should fail with an error", async () => {
    server.use(
      graphql.query("GetRepositories", () => {
        return HttpResponse.json({
          errors: [{ message: "Request failed" }],
        });
      })
    );

    const repositories = await getRepositories("react");

    expect(repositories).toEqual({
      repositories: null,
      isLoading: false,
      error: ERR_MESSAGE_GRAPHQL,
    });
  });
});
