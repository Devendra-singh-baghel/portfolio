import * as React from "react";

export interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LinkedInIcon({
  className = "size-4",
  ...props
}: LinkedInIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <g transform="translate(-1.4 0)">
        <circle cx="7.5" cy="7.5" r="1.25" />
        <rect x="6.25" y="10.5" width="2.5" height="7" rx="0.5" />
        <path d="M12 17.5V10.5h2.4v1.1c.6-.8 1.5-1.3 2.8-1.3 2.1 0 3.3 1.3 3.3 3.6v3.6H18v-3.4c0-1-.5-1.6-1.5-1.6-1 0-1.6.6-1.6 1.6v3.4H12z" />
      </g>
    </svg>
  );
}
