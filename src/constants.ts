// GitHuB GraphQL url endpoint
export const GITHUB_URL =
  process.env.GITHUB_URL || "https://api.github.com/graphql";

// GitHub repositiries limit to use to filter
export const REPOSITORIES_DEFAULT_LIMIT = 20;

// Stargazers limit to use to filter
export const STARGAZERS_DEFAULT_LIMIT = 20;

// The URL search query string name to use to retrieve data from the URL
export const URL_SEARCH_PARAM = "search";

// Different error messages use when retrieving data
export const ERR_MESSAGE_GRAPHQL =
  "It's not you. It's us!. Please try again later!";
export const ERR_MESSAGE_HTTP =
  "Error occurred while fetching data. Please try again!";
export const ERR_MESSAGE_UNEXPECTED =
  "An unexpected error occurred. Please try again!";

export const NOT_FOUND_MESSAGE = "Sorry, could not found requested resource!";
