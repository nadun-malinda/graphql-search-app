import { URL_SEARCH_PARAM } from "@/constants";

/**
 * Generates a URL search query string with the given search term as a parameter.
 *
 * @param {string | null} query - The search term.
 * @returns {string} The generated URL query string.
 * @example generateUrlSearchString("test") // "?search=test"
 */
export function generateUrlSearchString(query: string | null): string {
  return `?${URL_SEARCH_PARAM}=${query}`;
}
