"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

interface SearchProps {
  focusOnLoad?: boolean;
  placeholder?: string;
}

export function Search({ focusOnLoad = false, placeholder }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const debounedSearchText = useDebounce(searchText);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // focus on the input element when the component mounts
    focusOnLoad && inputRef.current?.focus();
  }, [focusOnLoad]);

  useEffect(() => {
    if (debounedSearchText) {
      router.push(`/?query=${debounedSearchText}`);
    } else {
      router.push("/");
    }
  }, [debounedSearchText, pathname, router]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="my-8 w-full max-w-lg rounded-lg border-4 border-cyan-400 bg-white py-4 px-6 shadow-md focus:outline-none focus:ring-4 text-lg text-black"
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.currentTarget.value)
      }
      value={searchText}
    />
  );
}
