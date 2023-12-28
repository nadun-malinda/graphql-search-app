import { GET_REPOSITORY } from "../graphql/queries/repository";
import { ApiResponse, graphQLClient } from "../graphql/client/graphQLClient";

import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

/**
 * Represents an owner of a GitHub repository.
 */
type Owner = {
  id: string;
  login: string;
  avatarUrl: string;
};

/**
 * Represents a stargazer of a GitHub repository.
 */
type Stargazer = {
  id: string;
  name: string | null;
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
type Repository = {
  id: string;
  name: string;
  description: string;
  owner: Owner;
  stargazers: Stargazers;
};

/**
 * Represents the response structure from a GitHub repository query.
 */
type GitHubRepositoryResponse = {
  repository: Repository;
};

/**
 * Response type for the getRepository function.
 */
type Response = {
  repository: Repository | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Variables required for fetching a GitHub repository.
 */
type Variables = {
  owner: string;
  name: string;
  stargazersLimit?: number;
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
