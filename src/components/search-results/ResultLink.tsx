"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ResultLink({ link }: { link: string }) {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/${link}?query=${searchParams.get("query")}`}
      className="text-white font-semibold"
    >
      View repository →
    </Link>
  );
}
