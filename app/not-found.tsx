import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div className="mx-auto flex max-w-xl flex-col items-start gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="404"
          title="Page not found"
          description="The page you are looking for does not exist or has moved."
        />

        <Button asChild className="h-10 px-5 text-sm sm:h-11 sm:px-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
