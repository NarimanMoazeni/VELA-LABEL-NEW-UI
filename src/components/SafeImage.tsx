import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

/**
 * Image with graceful fallback: if `src` 404s (e.g. a photo that has not
 * been uploaded to public/products yet), it swaps to `fallback` once,
 * and hides itself if even the fallback fails. Prevents broken icons.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallback,
  alt = '',
  onError,
  ...rest
}) => {
  const [failed, setFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  if (fallbackFailed) return null;

  return (
    <img
      {...rest}
      src={failed && fallback ? fallback : src}
      alt={alt}
      onError={(e) => {
        if (failed) setFallbackFailed(true);
        else setFailed(true);
        onError?.(e as unknown as React.SyntheticEvent<HTMLImageElement, Event>);
      }}
    />
  );
};
