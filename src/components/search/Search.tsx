"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

/**
 * Interface for search component props.
 *
 * @interface
 * @property {boolean} [focusOnLoad=false] - Whether to focus on the input on component mount.
 * @property {string} [placeholder] - Placeholder text for the input.
 */
interface SearchProps {
  focusOnLoad?: boolean;
  placeholder?: string;
}

/**
 * Search component for handling search functionality.
 *
 * @param {SearchProps} props - Component properties.
 * @param {boolean} props.focusOnLoad - Whether to focus on the input on component mount.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @returns {JSX.Element} - The JSX element representing the Search component.
 */
export function Search({
  focusOnLoad = false,
  placeholder,
}: SearchProps): JSX.Element {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState(searchParams.get("query") || "");
  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    // Focus on the input element when the component mounts
    focusOnLoad && inputRef.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearchText) {
      params.set("query", debouncedSearchText);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchText, pathname, replace, searchParams]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="my-8 w-full max-w-lg rounded-full border border-gray-600 shadow-react-deep-slate bg-react-dark py-2 px-6 focus:outline-none focus:ring-2 ring-gray-600 text-lg text-white"
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.currentTarget.value)
      }
      value={searchText}
    />
  );
}
