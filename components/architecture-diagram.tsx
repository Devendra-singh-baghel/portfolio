import * as React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

interface Step {
  number: string;
  name: string;
}

const STEPS: readonly Step[] = [
  { number: "01", name: "Upload" },
  { number: "02", name: "Preprocess" },
  { number: "03", name: "Gemini Flash-Lite" },
  { number: "04", name: "Validate" },
  { number: "05", name: "Review" },
];

export function ArchitectureDiagram() {
  return (
    <figure
      aria-label="Document extraction architecture pipeline"
      className="my-8 flex flex-col gap-3"
    >
      <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {STEPS.map((step, idx) => {
          const isLast = idx === STEPS.length - 1;

          return (
            <React.Fragment key={step.number}>
              <li className="flex flex-1 flex-col justify-center rounded-lg border border-border bg-card p-3 text-center sm:p-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {step.number}
                </span>
                <span className="mt-1 font-sans text-xs font-medium text-foreground sm:text-sm">
                  {step.name}
                </span>
              </li>

              {!isLast && (
                <li
                  aria-hidden="true"
                  className="flex items-center justify-center py-1 text-muted-foreground sm:px-1 sm:py-0"
                >
                  <ArrowDown className="size-4 sm:hidden" />
                  <ArrowRight className="hidden size-4 sm:block" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>

      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        Pipeline flow: forms are uploaded and preprocessed, extracted with Gemini Flash-Lite, validated, and reviewed by staff.
      </figcaption>
    </figure>
  );
}
