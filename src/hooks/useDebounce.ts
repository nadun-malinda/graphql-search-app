"use client";

import { useState, useEffect } from "react";

/**
 * Debounces a value with the specified delay.
 *
 * @param {string | null} value - The value to debounce.
 * @param {number} [delay=300] - The delay in milliseconds.
 * @returns {string | null} - The debounced value.
 */
export function useDebounce(
  value: string | null,
  delay: number = 300
): string | null {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clean up and cancel the timeout when value or delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  // this will return the latest value,
  // if "value" hasn't been updated within the last "delay" time
  return debouncedValue;
}
