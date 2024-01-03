"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { URL_SEARCH_PARAM } from "@/constants";

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
 * Search component for handling search functionality and update the url search params.
 * Then the components the use the search params from the url can update their content.
 *
 * @param {SearchProps} props - Component properties.
 * @param {boolean} props.focusOnLoad - Whether to focus on the input on component mount.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @returns {JSX.Element} - The JSX element representing the Search component.
 * @example <Search focusOnLoad placeholder="Search..." />
 */
export function Search({
  focusOnLoad = false,
  placeholder,
}: SearchProps): JSX.Element {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState(
    searchParams.get(URL_SEARCH_PARAM) || ""
  );
  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    // focus on the input element when the component mounts
    focusOnLoad && inputRef.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    const searchParam = new URLSearchParams(searchParams);

    if (debouncedSearchText) {
      // set the search parameter if the search text is not empty
      searchParam.set(URL_SEARCH_PARAM, debouncedSearchText);
    } else {
      // remove the search parameter if the search text is empty
      searchParam.delete(URL_SEARCH_PARAM);
    }

    replace(`${pathname}?${searchParam.toString()}`);
  }, [debouncedSearchText, pathname, replace, searchParams]);

  return (
    <div className="my-8 w-full max-w-lg relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-full border border-gray-600 shadow-react-deep-slate bg-react-dark py-2 pl-6 pr-12 focus:outline-none focus:ring-2 ring-gray-600 text-lg text-white"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.currentTarget.value)
        }
        value={searchText}
      />
      <button
        type="reset"
        onClick={() => setSearchText("")}
        className={`absolute border border-gray-500 top-[11px] right-4 cursor-pointer w-6 h-6 pb-0.5 rounded-full flex justify-center items-center text-gray-400 bg-gray-600 transition-colors ${
          searchText ? "opacity-100" : "opacity-20 pointer-events-none"
        }}`}
        disabled={!searchText}
      >
        x
      </button>
    </div>
  );
}
