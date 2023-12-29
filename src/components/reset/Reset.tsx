"use client";

import { Button } from "../button";
import { useRepositoryContext } from "@/hooks/useRepositoryContext";

/**
 * Reset component that renders a button to reset the clickedResults array.
 * @returns {JSX.Element} - The JSX element representing the Reset component.
 */
export function Reset(): JSX.Element {
  const { clickedResults, clearClickedResults } = useRepositoryContext();

  return (
    <div className="flex justify-end w-full">
      <Button
        disabled={clickedResults.length === 0}
        onClick={() => clearClickedResults()}
        text="Reset"
      />
    </div>
  );
}
