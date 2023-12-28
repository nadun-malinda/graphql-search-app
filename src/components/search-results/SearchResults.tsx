import Image from "next/image";
import type { GithubRepository } from "@/libs/repository/getRepositories";

import { Card } from "../card/Card";

interface SearchResultsProps {
  repositories: GithubRepository[] | null;
}

export function SearchResults({ repositories }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 w-full">
      {repositories?.map((repository) => (
        <Card key={repository.node.id}>
          <Card.Header>{repository.node.name}</Card.Header>
          <Card.Content>
            <div className="flex flex-row gap-2 items-center mb-1">
              <div>
                <Image
                  src={repository.node.owner.avatarUrl}
                  width={20}
                  height={20}
                  alt={`Avatar of ${repository.node.owner.login}`}
                  className="rounded-full shadow-md"
                />
              </div>
              <p className="text-md">{repository.node.owner.login}</p>
            </div>
            <p className="text-sm mb-2">⭐ {repository.node.stargazerCount}</p>
            <p className="text-sm line-clamp-3">
              {repository.node.description}
            </p>
          </Card.Content>
          <Card.Link href={`/${repository.node.nameWithOwner}`}>
            View repository →
          </Card.Link>
        </Card>
      ))}
    </div>
  );
}
