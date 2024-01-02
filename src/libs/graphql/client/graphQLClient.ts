import {
  ERR_MESSAGE_GRAPHQL,
  ERR_MESSAGE_HTTP,
  ERR_MESSAGE_UNEXPECTED,
  GITHUB_URL,
  NOT_FOUND_MESSAGE,
} from "@/constants";
import type { GraphQLClientConfig } from "@/types/graphql-client";

/**
 * Represents the structure of the API response.
 *
 * @template T - The expected response data type.
 */
export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Represents the structure of the error reducer function arguments.
 *
 * @property {Response} response - The response object.
 * @property {any} errors - The GraphQL query errors.
 * @property {any} data - The response data.
 */
type ErrorReducerType = {
  response: Response;
  errors: any;
  data: any;
};

/**
 * Reduces the error response to a single error message.
 *
 * @param {ErrorReducerType} - The error reducer function arguments.
 * @returns {string | null} The error message or null if no error.
 */
function errorReducer({
  response,
  errors,
  data,
}: ErrorReducerType): string | null {
  switch (true) {
    case response.ok && !errors:
      return null;
    case errors?.[0].type === "NOT_FOUND":
      console.error("GraphQL query errors:", errors);
      return NOT_FOUND_MESSAGE;
    case !!errors:
      console.error("GraphQL query errors:", errors);
      return ERR_MESSAGE_GRAPHQL;
    default:
      console.error("Error fetching data:", data);
      return ERR_MESSAGE_HTTP;
  }
}

/**
 * GraphQL client for making requests to the GitHub API using fetchAPI.
 *
 * @template T - The expected response data type.
 * @param {string} query - The GraphQL query.
 * @param {GraphQLClientConfig} [config] - Configuration object for variables and revalidation.
 * @returns {Promise<ApiResponse<T>>} A promise containing the response data, loading state, and error message.
 */
export const graphQLClient = async <T>(
  query: string,
  config?: GraphQLClientConfig
): Promise<ApiResponse<T>> => {
  const { variables, revalidate = 50 } = config || {};

  const result: ApiResponse<T> = {
    data: null,
    isLoading: true,
    error: null,
  };

  try {
    const response = await fetch(GITHUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate, // NextJS api cache revalidation period. Default is set to 50.
      },
    });

    const { data, errors } = await response.json();

    result.error = errorReducer({ response, errors, data });

    if (!result.error) {
      result.data = data as T;
    }
  } catch (error) {
    // Handle unexpected errors
    result.error = ERR_MESSAGE_UNEXPECTED;
    console.error("Error fetching data:", error);
  } finally {
    result.isLoading = false;
  }

  return result;
};
