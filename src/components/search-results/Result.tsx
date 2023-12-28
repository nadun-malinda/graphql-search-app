import { Repository } from "@/libs/repository/getRepositories";

import { Card } from "../card";
import { Image } from "../image";
import { ResultLink } from "./ResultLink";

/**
 * Component to display a search result card for a GitHub repository.
 *
 * @param {Object} props - The input props.
 * @param {Repository} props.repository - The repository object to display.
 * @returns {JSX.Element} - The JSX element representing the Result component.
 */
export function Result({
  repository,
}: {
  repository: Repository;
}): JSX.Element {
  return (
    <div className="md:hover:origin-center md:hover:rotate-2 md:hover:scale-105 md:transition-transform">
      <Card>
        <Card.Header>{repository.name}</Card.Header>

        <Card.Content>
          <div className="flex flex-row gap-2 items-center mb-1">
            <div>
              <Image
                src={repository.owner.avatarUrl}
                width={25}
                height={25}
                alt={`Avatar of ${repository.owner.login}`}
                className="rounded-full shadow-md border border-white"
              />
            </div>
            <p className="text-md">{repository.owner.login}</p>
          </div>
          <p className="text-sm mb-2">⭐ {repository.stargazerCount}</p>
          <p className="text-sm line-clamp-3">{repository.description}</p>
        </Card.Content>

        <Card.Footer>
          <ResultLink link={repository.nameWithOwner} />
        </Card.Footer>
      </Card>
    </div>
  );
}
