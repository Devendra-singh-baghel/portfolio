import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={`font-serif text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl ${className || ""}`}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={`mt-10 mb-4 font-serif text-2xl font-normal leading-snug tracking-tight text-foreground sm:text-3xl ${className || ""}`}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={`mt-8 mb-3 font-serif text-xl font-normal leading-snug tracking-tight text-foreground sm:text-2xl ${className || ""}`}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={`mb-4 text-base leading-relaxed text-muted-foreground sm:text-lg ${className || ""}`}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={`mb-6 list-disc list-outside space-y-2 pl-5 text-muted-foreground marker:text-primary ${className || ""}`}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={`mb-6 list-decimal list-outside space-y-2 pl-5 text-muted-foreground marker:text-primary ${className || ""}`}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={`text-base leading-relaxed sm:text-lg ${className || ""}`}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={`rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-foreground sm:text-sm ${className || ""}`}
        {...props}
      />
    ),
    ...components,
  };
}
