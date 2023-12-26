import { Search } from "@/components/search/Search";
import { Results } from "@/components/results/Results";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Search />
      <Results />
    </main>
  );
}
