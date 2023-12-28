import { GITHUB_URL } from "@/constants";

import { GET_REPOSITORY } from "../graphql/queries/repository";
import { ApiResponse, graphQLClient } from "../graphql/client/graphQLClient";
import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

type Avatar = {
  id: string;
  name: string | null;
  avatarUrl: string;
};

type Stargazer = Avatar;

type Owner = {
  id: string;
  login: string;
  avatarUrl: string;
};

type Stargazers = {
  totalCount: number;
  nodes: Stargazer[];
};

type Repository = {
  owner: Owner;
  id: string;
  name: string;
  stargazers: Stargazers;
};

type GraphQLResponse = {
  repository: Repository;
};

/**
 * Response type for the getRepository function.
 */
type RepositoryResponse = {
  repository: Repository | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Fetches a GitHub repository using GraphQL.
 *
 * @param {string} owner - The owner of the repository.
 * @param {string} name - The name of the repository.
 * @returns {Promise<RepositoriesResponse>} A promise containing the repository, loading state, and error message.
 */
export async function getRepository({
  owner,
  name,
}: {
  owner: string;
  name: string;
}): Promise<RepositoryResponse> {
  const graphqlClientConfig: GraphQLClientConfig = {
    variables: { owner, name },
  };

  try {
    const { data, isLoading, error }: ApiResponse<GraphQLResponse> =
      await graphQLClient(GITHUB_URL, GET_REPOSITORY, graphqlClientConfig);

    return { repository: data?.repository || null, isLoading, error };
  } catch (error) {
    // Handle unexpected errors
    console.error("Error fetching repository:", error);
    return {
      repository: null,
      isLoading: false,
      error: "An unexpected error occurred while fetching repository!",
    };
  }
}
