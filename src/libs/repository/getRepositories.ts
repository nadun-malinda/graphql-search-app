import { GET_REPOSITORIES } from "../graphql/queries/repository";
import { graphQLClient, ApiResponse } from "../graphql/client/graphQLClient";
import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

type Owner = {
  login: string;
  avatarUrl: string;
};

type Stargazer = {
  id: string;
  name: string | null;
  totalCount: number;
  avatarUrl: string;
};

type Stargazers = {
  totalCount: number;
  nodes: Stargazer[];
};

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
 * Type representing the response structure from a GitHub search query.
 */
type GithubSearchResponse = {
  search: {
    edges: {
      node: Repository;
    }[];
  };
};

/**
 * Return type for the getRepositories function.
 */
type Response = {
  repositories: Repository[] | null;
  isLoading: boolean;
  error: string | null;
};

type Variables = {
  query: string;
  limit?: number;
};

/**
 * Fetch GitHub repositories based on a search text.
 *
 * @param {string} searchText - The search text to query GitHub repositories.
 * @returns {Promise<Response>} A promise containing the repositories, loading state, and error message.
 * @throws Will throw an error if the GraphQL client request fails.
 */
export async function getRepositories(searchText: string): Promise<Response> {
  if (!searchText) {
    return { repositories: null, isLoading: false, error: null };
  }

  const config: GraphQLClientConfig = {
    variables: { query: searchText },
  };

  try {
    const { data, isLoading, error }: ApiResponse<GithubSearchResponse> =
      await graphQLClient(GET_REPOSITORIES, config);

    return {
      // shape the data by removing unnecessary wrapper objects
      repositories: data?.search.edges.map((edge) => edge.node) || null,
      isLoading,
      error,
    };
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
