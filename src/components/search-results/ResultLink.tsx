"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * ResultLink component for navigating to a repository page.
 *
 * @param {Object} props - The input props.
 * @param {string} props.link - The link to the repository page.
 * @returns {JSX.Element} - The JSX element for the result link.
 */
export function ResultLink({ link }: { link: string }): JSX.Element {
  const searchParams = useSearchParams();

  return (
    <Link
      onClick={(e) => e.stopPropagation()} // prevent the parent from being clicked
      href={`/${link}?query=${searchParams.get("query")}`}
      className="text-white font-semibold"
    >
      View repository →
    </Link>
  );
}
