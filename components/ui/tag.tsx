import * as React from "react";
import { cn } from "@/lib/utils";

export type TagProps = React.ComponentProps<"span">;

function Tag({ className, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex items-center rounded border border-border bg-transparent px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Tag };
