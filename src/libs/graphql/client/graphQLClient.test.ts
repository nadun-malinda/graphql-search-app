import { HttpResponse, graphql, http } from "msw";

import { server } from "@/tests/mocks/server";
import { allRepositories } from "@/tests/mocks/handlers";

import { graphQLClient } from "./graphQLClient";
import { GET_REPOSITORIES } from "../queries/repository";
import { ERR_MESSAGE_GRAPHQL, ERR_MESSAGE_UNEXPECTED } from "@/constants";

const GRAPHQL_API = process.env.GITHUB_URL as string;

describe("graphQLCleint", () => {
  it("should return data when the request is successfull", async () => {
    const responseData = await graphQLClient(GET_REPOSITORIES);

    expect(responseData).toEqual({
      data: allRepositories,
      isLoading: false,
      error: null,
    });
  });

  it("should return GraphQL error on API call with GraphQL error", async () => {
    server.use(
      graphql.query("GetRepositories", () => {
        return HttpResponse.json({
          errors: [{ message: "GraphQL error" }],
        });
      })
    );

    const response = await graphQLClient(GET_REPOSITORIES);

    expect(response).toEqual({
      data: null,
      isLoading: false,
      error: ERR_MESSAGE_GRAPHQL,
    });
  });

  it("should returns unexpected error on API call with unexpected errors", async () => {
    server.use(
      http.post(GRAPHQL_API, () => {
        return HttpResponse.error();
      })
    );

    const response = await graphQLClient(GET_REPOSITORIES);

    expect(response).toEqual({
      data: null,
      isLoading: false,
      error: ERR_MESSAGE_UNEXPECTED,
    });
  });
});
