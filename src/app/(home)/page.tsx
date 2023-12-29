import { Suspense } from "react";

import { getRepositories } from "@/libs/repository";

import { Await } from "@/components/await";
import { Error } from "@/components/error";
import { Reset } from "@/components/reset";
import { Search } from "@/components/search";
import { LoadingSkeleton } from "@/components/loading";
import { SearchResults } from "@/components/search-results";

import type { Repository } from "@/types/repository";

/**
 * Interface for search parameters.
 *
 * @interface
 * @property {string} [search] - The search query parameter.
 */
interface SearchParams {
  search?: string;
}

/**
 * Interface for the Home component props.
 *
 * @interface
 * @property {SearchParams} [searchParams] - The search parameters.
 */
interface HomeProps {
  searchParams?: SearchParams;
}

/**
 * Home component for rendering the main search page.
 *
 * @param {HomeProps} props - The input props.
 * @returns {JSX.Element} - The JSX element for the home page.
 */
export default function Home({ searchParams }: HomeProps): JSX.Element {
  const searchParam = searchParams?.search || "";
  const promise = getRepositories(searchParam);

  return (
    <main className="flex flex-col justify-center items-center mb-6">
      <Search focusOnLoad placeholder="Search for a GitHub repository..." />

      <Reset />

      <Suspense fallback={<LoadingSkeleton />} key={searchParam}>
        <Await promise={promise}>
          {({
            repositories,
            error,
          }: {
            repositories: Repository[] | null;
            error: string | null;
          }) =>
            error ? (
              <Error message={error} />
            ) : (
              <SearchResults repositories={repositories} />
            )
          }
        </Await>
      </Suspense>
    </main>
  );
}
