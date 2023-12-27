import { Suspense } from "react";

import { Await } from "@/components/await";
import { Search } from "@/components/search";
import { LoadingSkeleton } from "@/components/loading";
import { SearchResults } from "@/components/search-results";

import { getRepositories } from "@/libs/repository/getRepositories";

interface SearchParams {
  query?: string;
}

interface HomeProps {
  searchParams?: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams?.query || "";
  const promise = getRepositories(query);

  return (
    <main className="flex flex-col justify-center items-center">
      <Search focusOnLoad placeholder="Search for a GitHub repository..." />

      <Suspense fallback={<LoadingSkeleton />} key={query}>
        <Await promise={promise}>
          {({ repositories }) => <SearchResults repositories={repositories} />}
        </Await>
      </Suspense>
    </main>
  );
}
