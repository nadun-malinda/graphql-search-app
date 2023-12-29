"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { URL_SEARCH_PARAM } from "@/constants";
import { generateUrlSearchString } from "@/utils/url";

/**
 * ResultLink component for navigating to a repository page.
 *
 * @param {Object} props - The input props.
 * @param {string} props.link - The link to the repository page.
 * @returns {JSX.Element} - The JSX element for the result link.
 */
export function ResultLink({ link }: { link: string }): JSX.Element {
  const searchParams = useSearchParams();

  function getDetailPageLinkWithQuery(): string {
    // search parameter in the url
    const param = searchParams.get(URL_SEARCH_PARAM);

    return `/${link}${generateUrlSearchString(param)}`;
  }

  return (
    <Link
      onClick={(e) => e.stopPropagation()} // prevent the parent from being clicked
      href={getDetailPageLinkWithQuery()}
      className="text-white font-semibold"
    >
      View repository →
    </Link>
  );
}
