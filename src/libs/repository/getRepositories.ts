import { GITHUB_URL } from "@/constants";

import { GET_REPOSITORIES } from "../graphql/queries/repository";
import { graphQLClient, ApiResponse } from "../graphql/client/graphQLClient";
import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

/**
 * Type representing a GitHub repository node.
 */
export type GithubRepository = {
  node: {
    id: string;
    name: string;
    nameWithOwner: string;
    description?: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
    stargazerCount: number;
    stargazers: {
      totalCount: number;
      nodes: {
        id: string;
        name: string | null;
        avatarUrl: string;
      }[];
    };
  };
};

/**
 * Type representing the response structure from a GitHub search query.
 */
type GithubSearchResponse = {
  search: {
    edges: GithubRepository[];
  };
};

/**
 * Return type for the getRepositories function.
 */
type RepositoriesResponse = {
  repositories: GithubRepository[] | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Fetch GitHub repositories based on a search text.
 *
 * @param {string} searchText - The search text to query GitHub repositories.
 * @returns {Promise<RepositoriesResponse>} A promise containing the repositories, loading state, and error message.
 * @throws Will throw an error if the GraphQL client request fails.
 */
export async function getRepositories(
  searchText: string
): Promise<RepositoriesResponse> {
  if (!searchText) {
    return { repositories: null, isLoading: false, error: null };
  }

  const config: GraphQLClientConfig = {
    variables: { query: searchText },
  };

  try {
    const { data, isLoading, error }: ApiResponse<GithubSearchResponse> =
      await graphQLClient(GITHUB_URL, GET_REPOSITORIES, config);

    return { repositories: data?.search.edges || null, isLoading, error };
  } catch (error) {
    // Handle unexpected errors
    console.error("Error fetching repositories:", error);
    return {
      repositories: null,
      isLoading: false,
      error: "An unexpected error occurred while fetching repositories!",
    };
  }
}
