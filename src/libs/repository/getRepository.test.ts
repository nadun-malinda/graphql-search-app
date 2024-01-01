import { HttpResponse, graphql } from "msw";

import { singleRepository } from "@/__tests__/__mocks__/handlers";
import { server } from "@/__tests__/__mocks__/server";

import { ERR_MESSAGE_GRAPHQL } from "@/constants";
import { getRepository } from ".";

describe("getRepository", () => {
  it("should return a single repository details by search query", async () => {
    const repository = await getRepository({
      owner: "Cathy0807",
      name: "react",
    });

    expect(repository).toEqual({
      repository: singleRepository.repository,
      isLoading: false,
      error: null,
    });
  });

  it("should fail with an error", async () => {
    server.use(
      graphql.query("GeRepository", () => {
        return HttpResponse.json({
          errors: [{ message: "Request failed" }],
        });
      })
    );

    const repository = await getRepository({
      owner: "Cathy0807",
      name: "react",
    });

    expect(repository).toEqual({
      repository: null,
      isLoading: false,
      error: ERR_MESSAGE_GRAPHQL,
    });
  });
});
