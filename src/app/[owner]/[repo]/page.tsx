import { Await } from "@/components/await";
import { getRepository } from "@/libs/repository/getRepository";
import Link from "next/link";
import Image from "next/image";

type Params = {
  owner: string;
  repo: string;
};

type SearchParams = {
  query: string;
};

interface RepositoryDetailProps {
  params: Params;
  searchParams: SearchParams;
}

export default function RepositoryDetailPage({
  params,
  searchParams,
}: RepositoryDetailProps) {
  const promise = getRepository({ owner: params.owner, name: params.repo });

  return (
    <div className="p-8 border border-gray-600 shadow-react-deep-slate bg-react-dark text-white rounded-md">
      <Link
        href={`/?query=${searchParams.query}`}
        className="block text-white font-semibold mb-8"
      >
        ← Home
      </Link>

      <Await promise={promise}>
        {({ repository }) => (
          <>
            <h1 className="text-3xl font-bold mb-6">{repository?.name}</h1>

            <p className="font-bold mb-2">Owner: </p>
            <div className="flex flex-row gap-3 items-center mb-5">
              <Image
                src={repository?.owner.avatarUrl || ""}
                alt={`Avatar of ${repository?.owner.login}`}
                width={35}
                height={35}
                className="rounded-full border border-white"
              />
              <h3 className="text-lg">{repository?.owner.login}</h3>
            </div>

            <p className="font-bold mb-2">Description: </p>
            <p className="mb-5">{repository?.description}</p>

            <p className="font-bold mb-2">Stargrazers: </p>
            <div className="flex flex-row gap-1 mb-3 flex-wrap">
              {repository?.stargazers.nodes.map((stargazer) => (
                <Image
                  key={stargazer.id}
                  src={stargazer.avatarUrl}
                  alt={`Avatar of ${stargazer.name}`}
                  width={30}
                  height={30}
                  className="rounded-full border border-white"
                />
              ))}
            </div>
          </>
        )}
      </Await>
    </div>
  );
}
