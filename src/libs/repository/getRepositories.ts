import { GET_REPOSITORIES } from "../graphql/queries/repository";
import { graphQLClient, ApiResponse } from "../graphql/client/graphQLClient";

import type { GraphQLClientConfig } from "@/types/graphql-client";
import type { Repository, GithubSearchResponse } from "@/types/repository";

/**
 * Represents the response structure for the getRepositories function.
 */
type Response = {
  repositories: Repository[] | null;
  isLoading: boolean;
  error: string | null;
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
