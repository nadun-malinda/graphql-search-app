"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

interface SearchProps {
  focusOnLoad?: boolean;
  placeholder?: string;
}

export function Search({ focusOnLoad = false, placeholder }: SearchProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState(searchParams.get("query") || "");
  const debounedSearchText = useDebounce(searchText);

  useEffect(() => {
    // focus on the input element when the component mounts
    focusOnLoad && inputRef.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debounedSearchText) {
      params.set("query", debounedSearchText);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debounedSearchText, pathname, replace, searchParams]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="my-8 w-full max-w-lg rounded-full border border-gray-600 shadow-react-deep-slate bg-react-dark py-2 px-6 focus:outline-none focus:ring-2 ring-gray-600 text-lg text-white"
      placeholder={`🔎 ${placeholder}`}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.currentTarget.value)
      }
      value={searchText}
    />
  );
}
