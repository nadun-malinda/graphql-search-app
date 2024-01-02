"use client";

import { useRepositoryContext } from "@/hooks/useRepositoryContext";

import { Card } from "../card";
import { Image } from "../image";
import { ResultLink } from "./ResultLink";

interface ResultProps {
  id: string;
  name: string;
  avatarUrl: string;
  ownerLogin: string;
  stargazerCount: number;
  description: string;
  link: string;
}

/**
 * Component to display a search result card for a GitHub repository.
 *
 * @param {ResultProps} props - The props of the component.
 * @param {string} props.id - The ID of the repository.
 * @param {string} props.name - The name of the repository.
 * @param {string} props.avatarUrl - The URL of the owner's avatar.
 * @param {string} props.ownerLogin - The login name of the owner.
 * @param {number} props.stargazerCount - The number of stars the repository has.
 * @param {string} props.description - The description of the repository.
 * @param {string} props.link - The link to the repository.
 */
export function Result({
  id,
  name,
  avatarUrl,
  ownerLogin,
  stargazerCount,
  description,
  link,
}: ResultProps): JSX.Element {
  const { clickedResults, handleResultClick } = useRepositoryContext();

  return (
    <div
      className="md:hover:origin-center md:hover:rotate-2 md:hover:scale-105 md:transition-transform"
      onClick={() => handleResultClick(id)}
    >
      <Card
        data-testid="single-result"
        cssClasses={`${
          clickedResults.includes(id) ? "opacity-50" : "opacity-1"
        }`}
      >
        <Card.Header>{name}</Card.Header>

        <Card.Content>
          <div className="flex flex-row flex-wrap gap-2 items-center mb-1">
            <div>
              <Image
                src={avatarUrl}
                width={25}
                height={25}
                alt={`Avatar of ${ownerLogin}`}
                className="rounded-full shadow-md border border-white"
              />
            </div>
            <p className="text-md break-all">{ownerLogin}</p>
          </div>
          <p className="text-sm mb-2">⭐ {stargazerCount}</p>
          <p className="text-sm line-clamp-3">{description}</p>
        </Card.Content>

        <Card.Footer>
          <ResultLink link={link} />
        </Card.Footer>
      </Card>
    </div>
  );
}
