import { GET_REPOSITORIES } from "../graphql/queries/repository";
import {
  graphQLClient,
  ApiResponse,
  FetchGraphQLConfig,
} from "../graphql/client/graphQLClient";

/**
 * Type representing a GitHub repository node.
 */
export type GithubRepository = {
  node: {
    id: string;
    name: string;
    nameWithOwner: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
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
 */
export async function getRepositories(
  searchText: string
): Promise<RepositoriesResponse> {
  if (!searchText) {
    return { repositories: null, isLoading: false, error: null };
  }

  const url = process.env.GITHUB_API || "https://api.github.com/graphql";
  const config: FetchGraphQLConfig = {
    variables: { query: searchText },
    revalidate: 50,
  };

  const { data, isLoading, error }: ApiResponse<GithubSearchResponse> =
    await graphQLClient(url, GET_REPOSITORIES, config);

  console.log("repositories: ", data?.search.edges || null);

  return { repositories: data?.search.edges || null, isLoading, error };
}
