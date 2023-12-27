import type { GithubRepository } from "@/libs/repository/getRepositories";

interface SearchResultsProps {
  repositories: GithubRepository[] | null;
}

export function SearchResults({ repositories }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {repositories?.map((repository: any) => (
        <div
          key={repository.node.id}
          className="border-4 border-cyan-400 hover:ring-4 transition-all rounded-md p-4 bg-white min-h-[150px]"
        >
          <h3 className="text-lg">{repository.node.name}</h3>
          <p className="text-md">{repository.node.nameWithOwner}</p>
        </div>
      ))}
    </div>
  );
}
