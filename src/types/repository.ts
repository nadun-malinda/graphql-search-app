/**
 * Represents the owner of a GitHub repository.
 */
type Owner = {
  id?: string;
  login: string;
  avatarUrl: string;
};

/**
 * Represents a stargazer of a GitHub repository.
 */
type Stargazer = {
  id: string;
  name: string | null;
  totalCount?: number;
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
  nameWithOwner?: string;
  description: string;
  owner: Owner;
  stargazerCount?: number;
  stargazers?: Stargazers;
};

/**
 * Represents the response structure from a GitHub search query for all matching repositories.
 */
export type GithubSearchResponse = {
  search: {
    edges: {
      node: Repository;
    }[];
  };
};

/**
 * Represents the response structure from a GitHub repository query for a single repository.
 */
export type GitHubRepositoryResponse = {
  repository: Repository;
};
