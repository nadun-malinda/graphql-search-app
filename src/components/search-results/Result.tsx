import Image from "next/image";

import { Repository } from "@/libs/repository/getRepositories";
import { Card } from "../card/Card";
import { ResultLink } from "./ResultLink";

export function Result({ repository }: { repository: Repository }) {
  return (
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
  );
}
