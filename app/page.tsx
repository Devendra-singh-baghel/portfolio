import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { SectionHeader } from "@/components/ui/section-header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-4 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <SectionHeader
          label="00 / PLACEHOLDER"
          title="Devendra Singh Baghel"
          description="Backend-focused Full-Stack Developer"
        />

        <Card>
          <CardHeader>
            <CardTitle>
              I build reliable APIs and practical web applications.
            </CardTitle>
            <CardDescription>
              Working with Node.js, Express.js, PostgreSQL and React to turn
              requirements into working software.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Tag>Node.js</Tag>
            <Tag>PostgreSQL</Tag>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-4">
            <Button>Explore Projects</Button>
            <Button variant="secondary">Contact Me</Button>
            <TextLink href="https://github.com/Devendra-singh-baghel">
              GitHub
            </TextLink>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
