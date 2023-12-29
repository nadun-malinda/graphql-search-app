import { useContext } from "react";
import { RepositoryContext } from "@/context/RepositoryContext";

/**
 * Custom hook that provides a shorthand way to use the RepositoryContext.
 *
 * @returns The context object provided by the RepositoryContext provider.
 */
export function useRepositoryContext() {
  return useContext(RepositoryContext);
}
