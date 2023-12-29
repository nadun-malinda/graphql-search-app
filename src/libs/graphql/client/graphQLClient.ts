import { GITHUB_URL } from "@/constants";
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

    const responseData = await response.json();

    if (response.ok && !responseData.errors) {
      // Successful response with no GraphQL errors
      result.data = responseData.data as T;
    } else if (responseData.errors) {
      // Handle GraphQL errors
      result.error = responseData.errors
        .map((error: any) => error.message)
        .join("\n");
      console.error("GraphQL query errors:", responseData.errors);
    } else {
      // Handle other HTTP errors
      result.error = "Error occurred while fetching data. Please try again!";
      console.error("Error fetching data:", responseData);
    }
  } catch (error) {
    // Handle unexpected errors
    result.error = "An unexpected error occurred. Please try again!";
    console.error("Error fetching data:", error);
  } finally {
    result.isLoading = false;
  }

  return result;
};
