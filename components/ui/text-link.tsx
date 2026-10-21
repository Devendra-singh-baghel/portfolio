import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TextLinkProps extends React.ComponentProps<typeof Link> {
  underline?: boolean;
}

function TextLink({
  className,
  underline = true,
  href,
  ...props
}: TextLinkProps) {
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:"));

  return (
    <Link
      href={href}
      target={
        isExternal && typeof href === "string" && !href.startsWith("mailto:")
          ? "_blank"
          : undefined
      }
      rel={
        isExternal && typeof href === "string" && !href.startsWith("mailto:")
          ? "noopener noreferrer"
          : undefined
      }
      className={cn(
        "inline-flex items-center gap-1 rounded-sm font-sans text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        underline &&
          "underline underline-offset-4 decoration-border hover:decoration-primary",
        className
      )}
      {...props}
    />
  );
}

export { TextLink };
