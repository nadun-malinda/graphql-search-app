import { GET_REPOSITORIES } from "../graphql/queries/repository";
import { graphQLClient, ApiResponse } from "../graphql/client/graphQLClient";

import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

/**
 * Represents the owner of a GitHub repository.
 */
type Owner = {
  login: string;
  avatarUrl: string;
};

/**
 * Represents a stargazer of a GitHub repository.
 */
type Stargazer = {
  id: string;
  name: string | null;
  totalCount: number;
  avatarUrl: string;
};

/**
 * Represents a list of stargazers of a GitHub repository.
 */
type Stargazers = {
  totalCount: number;
  nodes: Stargazer[];
};

/**
 * Represents a GitHub repository.
 */
export type Repository = {
  id: string;
  name: string;
  nameWithOwner: string;
  description?: string;
  owner: Owner;
  stargazerCount: number;
  stargazers: Stargazers;
};

/**
 * Represents the response structure from a GitHub search query.
 */
type GithubSearchResponse = {
  search: {
    edges: {
      node: Repository;
    }[];
  };
};

/**
 * Represents the response structure for the getRepositories function.
 */
type Response = {
  repositories: Repository[] | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Represents the variables required for fetching GitHub repositories.
 */
type Variables = {
  query: string;
  limit?: number;
};

/**
 * Fetch GitHub repositories based on a search text.
 *
 * @param {string} searchText - The search text to query GitHub repositories.
 * @returns {Promise<Response>} A promise containing the repositories, loading state, and error message.
 */
export async function getRepositories(searchText: string): Promise<Response> {
  if (!searchText) {
    return { repositories: null, isLoading: false, error: null };
  }

  const config: GraphQLClientConfig = {
    variables: { query: searchText },
  };

  const { data, isLoading, error }: ApiResponse<GithubSearchResponse> =
    await graphQLClient(GET_REPOSITORIES, config);

  return {
    // Shape the data by removing unnecessary wrapper objects
    repositories: data?.search.edges.map((edge) => edge.node) || null,
    isLoading,
    error,
  };
}
