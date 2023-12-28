import { GET_REPOSITORY } from "../graphql/queries/repository";
import { ApiResponse, graphQLClient } from "../graphql/client/graphQLClient";
import type { GraphQLClientConfig } from "../graphql/client/graphQLClient";

type Owner = {
  id: string;
  login: string;
  avatarUrl: string;
};

type Stargazer = {
  id: string;
  name: string | null;
  avatarUrl: string;
};

type Stargazers = {
  totalCount: number;
  nodes: Stargazer[];
};

type Repository = {
  id: string;
  name: string;
  description: string;
  owner: Owner;
  stargazers: Stargazers;
};

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

type Variables = {
  owner: string;
  name: string;
  stargazersLimit?: number;
};

/**
 * Fetches a GitHub repository using GraphQL.
 *
 * @param {string} owner - The owner of the repository.
 * @param {string} name - The name of the repository.
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

  try {
    const { data, isLoading, error }: ApiResponse<GitHubRepositoryResponse> =
      await graphQLClient(GET_REPOSITORY, graphqlClientConfig);

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
