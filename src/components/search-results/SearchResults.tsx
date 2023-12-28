import type { Repository } from "@/libs/repository/getRepositories";

import { Result } from "./Result";

interface SearchResultsProps {
  repositories: Repository[] | null;
}

export function SearchResults({ repositories }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
      {repositories?.map((repository) => (
        <Result key={repository.id} repository={repository} />
      ))}
    </div>
  );
}
