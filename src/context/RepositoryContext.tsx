"use client";

import { createContext, useState } from "react";

/**
 * Interface for the RepositoryContext props.
 * @interface
 * @property {string[]} clickedResults - An array of clicked result IDs.
 * @property {function} handleResultClick - Function to handle the click event on a result.
 * @property {function} clearClickedResults - Function to clear the clickedResults array.
 */
interface RepositoryContextProps {
  clickedResults: string[];
  handleResultClick: (id: string) => void;
  clearClickedResults: () => void;
}

/**
 * React context that provides an array of clicked result IDs and a function to handle result click events.
 */
export const RepositoryContext: React.Context<RepositoryContextProps> =
  createContext<RepositoryContextProps>({
    clickedResults: [],
    handleResultClick: () => {},
    clearClickedResults: () => {},
  });

/**
 * Provider component that provides the RepositoryContext to its children.
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children components to render.
 * @returns {React.Element} The rendered React element.
 */
export function RepositoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [clickedResults, setClckedResults] = useState<string[]>([]);

  /**
   * Handles the click event on a result.
   * If the ID of the result is already in the clickedResults array, it removes it.
   * If the ID of the result is not in the clickedResults array, it adds it.
   * @param {string} id - The ID of the clicked result.
   */
  function handleResultClick(id: string) {
    setClckedResults((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((resultId) => resultId !== id);
      } else {
        return [...prevState, id];
      }
    });
  }

  /**
   * Clears the clickedResults array to reset the state
   */
  function clearClickedResults() {
    setClckedResults([]);
  }

  return (
    <RepositoryContext.Provider
      value={{ clickedResults, handleResultClick, clearClickedResults }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}
