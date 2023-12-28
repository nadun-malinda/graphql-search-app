import { Await } from "@/components/await";
import { getRepository } from "@/libs/repository/getRepository";
import Link from "next/link";
import Image from "next/image";

export default async function Repository({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const promise = getRepository({ owner: params.owner, name: params.repo });

  return (
    <div>
      <Link href="/">Home</Link>
      Owner: {params.owner} - Repository: {params.repo}
      <Await promise={promise}>
        {({ repository }) => (
          <>
            <div>Name:::: {repository?.name}</div>{" "}
            <div className="flex flex-row gap-1">
              {repository?.stargazers.nodes.map((stargazer) => (
                <Image
                  key={stargazer.id}
                  src={stargazer.avatarUrl}
                  alt={`Avatar of ${stargazer.name}`}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ))}
            </div>
          </>
        )}
      </Await>
    </div>
  );
}
