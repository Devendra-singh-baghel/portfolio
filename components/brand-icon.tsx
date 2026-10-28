import * as React from "react";
import type { SimpleIcon } from "simple-icons";

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  icon?: SimpleIcon;
  path?: string;
  className?: string;
}

export function BrandIcon({
  icon,
  path,
  className = "size-4",
  ...props
}: BrandIconProps) {
  const d = path ?? icon?.path;
  if (!d) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={d} />
    </svg>
  );
}
