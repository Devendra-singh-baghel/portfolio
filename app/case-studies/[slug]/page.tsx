import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const VALID_SLUGS = ["ai-document-extraction"] as const;

export const dynamicParams = false;

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    return {
      title: "Case Study Not Found",
    };
  }

  const title = "AI Document Extraction";
  const description =
    "Case study on AI document extraction for airline forms with Google Gemini.";
  const pageUrl = `${SITE_URL}/case-studies/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title: `${title} | Devendra Singh Baghel`,
      description,
      url: pageUrl,
      siteName: "Devendra Singh Baghel",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Devendra Singh Baghel - Backend-focused Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Devendra Singh Baghel`,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound();
  }

  let Post: React.ComponentType;
  try {
    const mdxModule = await import(`@/content/case-studies/${slug}.mdx`);
    Post = mdxModule.default;
  } catch {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-4xl flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mb-8">
        <TextLink
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </TextLink>
      </div>

      <article className="max-w-[65ch]">
        <Post />
      </article>
    </main>
  );
}
