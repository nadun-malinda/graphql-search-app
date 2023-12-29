import { Result } from "./Result";
import { NoResults } from "./NoResults";

import type { Repository } from "@/types/repository";

/**
 * Props for the SearchResults component.
 *
 * @interface
 * @property {Repository[] | null} repositories - The array of repositories to display.
 */
interface SearchResultsProps {
  repositories: Repository[] | null;
}

/**
 * SearchResults component for displaying a grid of repositories.
 *
 * @param {SearchResultsProps} props - The input props.
 * @returns {JSX.Element} - The JSX element for search results.
 */
export function SearchResults({
  repositories,
}: SearchResultsProps): JSX.Element {
  if (repositories?.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
      {repositories?.map((repository) => (
        <Result
          key={repository.id}
          id={repository.id}
          name={repository.name}
          avatarUrl={repository.owner.avatarUrl}
          ownerLogin={repository.owner.login}
          stargazerCount={repository.stargazerCount}
          description={repository.description}
          link={repository.nameWithOwner}
        />
      ))}
    </div>
  );
}
