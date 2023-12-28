"use client";

import { useState } from "react";
import * as NextImage from "next/image";

import type { ImageProps } from "next/image";

/**
 * Image component wrapper that uses the NextJS Image component handles errors by displaying a fallback image.
 *
 * @param {ImageProps} props - The properties for the Image component.
 * @param {string} props.alt - The alternative text for the image.
 * @param {string} props.src - The source URL of the image.
 * @param {...any} props.rest - Additional properties forwarded to the NextImage component.
 * @returns {JSX.Element} - The JSX element representing the Image component.
 */
export function Image({ alt, src, ...rest }: ImageProps): JSX.Element {
  const [error, setError] = useState(false);

  return (
    <NextImage.default
      alt={alt}
      src={error ? "/avatar.webp" : src}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
