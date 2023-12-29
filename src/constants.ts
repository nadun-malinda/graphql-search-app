// GitHuB GraphQL url endpoint
export const GITHUB_URL =
  process.env.GITHUB_URL || "https://api.github.com/graphql";

// GitHub repositiries limit to use to filter
export const REPOSITORIES_DEFAULT_LIMIT = 20;

// Stargazers limit to use to filter
export const STARGAZERS_DEFAULT_LIMIT = 20;

// The URL search query string name to use to retrieve data from the URL
export const URL_SEARCH_PARAM = "search";
