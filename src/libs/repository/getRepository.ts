import { GET_REPOSITORY } from "../graphql/queries/repository";
import { ApiResponse, graphQLClient } from "../graphql/client/graphQLClient";

import type { GraphQLClientConfig } from "@/types/graphql-client";
import type { Repository, GitHubRepositoryResponse } from "@/types/repository";

/**
 * Response type for the getRepository function.
 */
type Response = {
  repository: Repository | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Fetches a GitHub repository using GraphQL.
 *
 * @param {Object} param - The parameters for the repository query.
 * @param {string} param.owner - The owner of the repository.
 * @param {string} param.name - The name of the repository.
 * @returns {Promise<Response>} A promise containing the repository, loading state, and error message.
 */
export async function getRepository({
  owner,
  name,
}: {
  owner: string;
  name: string;
}): Promise<Response> {
  const graphqlClientConfig: GraphQLClientConfig = {
    variables: { owner, name },
  };

  const { data, isLoading, error }: ApiResponse<GitHubRepositoryResponse> =
    await graphQLClient(GET_REPOSITORY, graphqlClientConfig);

  return { repository: data?.repository || null, isLoading, error };
}
