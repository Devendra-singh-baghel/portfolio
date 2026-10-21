import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.ComponentProps<"div"> {
  label: string;
  title: string;
  description?: string;
}

function SectionHeader({
  label,
  title,
  description,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { SectionHeader };
