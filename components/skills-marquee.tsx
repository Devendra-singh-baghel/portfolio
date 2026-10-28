import * as React from "react";
import { Lock, Network } from "lucide-react";
import {
  siClaude,
  siCloudinary,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siReacthookform,
  siReactrouter,
  siRedux,
  siSequelize,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";
import { VscodeIcon } from "@/components/vscode-icon";
import { AntigravityIcon } from "@/components/antigravity-icon";
import { cn } from "@/lib/utils";

type CustomIconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}>;

type IconType = SimpleIcon | CustomIconComponent;

interface MarqueeItem {
  readonly label: string;
  readonly icon: IconType;
}

function isSimpleIcon(icon: IconType): icon is SimpleIcon {
  return typeof icon === "object" && icon !== null && "path" in icon;
}

const FRONTEND_ITEMS: readonly MarqueeItem[] = [
  { label: "HTML5", icon: siHtml5 },
  { label: "CSS3", icon: siCss },
  { label: "JavaScript (ES6+)", icon: siJavascript },
  { label: "React", icon: siReact },
  { label: "Redux Toolkit", icon: siRedux },
  { label: "React Router", icon: siReactrouter },
  { label: "React Hook Form", icon: siReacthookform },
  { label: "Tailwind CSS", icon: siTailwindcss },
] as const;

const BACKEND_ITEMS: readonly MarqueeItem[] = [
  { label: "Node.js", icon: siNodedotjs },
  { label: "Express.js", icon: siExpress },
  { label: "REST API", icon: Network },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "Sequelize ORM", icon: siSequelize },
  { label: "MongoDB", icon: siMongodb },
  { label: "Mongoose", icon: siMongoose },
  { label: "JWT authentication", icon: siJsonwebtokens },
  { label: "Bcrypt.js", icon: Lock },
] as const;

const TOOLS_ITEMS: readonly MarqueeItem[] = [
  { label: "Git", icon: siGit },
  { label: "GitHub", icon: siGithub },
  { label: "Cloudinary", icon: siCloudinary },
  { label: "Vite", icon: siVite },
  { label: "Vercel", icon: siVercel },
  { label: "VS Code", icon: VscodeIcon },
  { label: "Claude", icon: siClaude },
  { label: "Antigravity", icon: AntigravityIcon },
  { label: "Next.js", icon: siNextdotjs },
  { label: "TypeScript", icon: siTypescript },
] as const;

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly MarqueeItem[];
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-max shrink-0 hover:paused",
        reverse ? "marquee-track-reverse" : "marquee-track"
      )}
    >
      <div className="marquee-set flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex h-20 sm:h-24 min-w-20 sm:min-w-24 flex-col items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-border/60 bg-card/60 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-card/90 shrink-0"
          >
            {isSimpleIcon(item.icon) ? (
              <BrandIcon
                icon={item.icon}
                className="size-8 sm:size-10 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            ) : (
              <item.icon
                className="size-8 sm:size-10 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            )}
            <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="marquee-duplicate flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
        {items.map((item) => (
          <div
            key={`${item.label}-dup`}
            className="group flex h-20 sm:h-24 min-w-20 sm:min-w-24 flex-col items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-border/60 bg-card/60 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-card/90 shrink-0"
          >
            {isSimpleIcon(item.icon) ? (
              <BrandIcon
                icon={item.icon}
                className="size-8 sm:size-10 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            ) : (
              <item.icon
                className="size-8 sm:size-10 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            )}
            <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <div>
      {/* Accessible semantic list for screen readers and SEO */}
      <div className="sr-only">
        <h3>Frontend</h3>
        <ul>
          {FRONTEND_ITEMS.map((item) => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
        <h3>Backend</h3>
        <ul>
          {BACKEND_ITEMS.map((item) => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
        <h3>Tools and Platforms</h3>
        <ul>
          {TOOLS_ITEMS.map((item) => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
      </div>

      {/* Visual animated marquee */}
      <div
        aria-hidden="true"
        className="marquee-mask relative w-full overflow-hidden py-4 select-none"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          <MarqueeRow items={FRONTEND_ITEMS} />
          <MarqueeRow items={BACKEND_ITEMS} reverse />
          <MarqueeRow items={TOOLS_ITEMS} />
        </div>
      </div>
    </div>
  );
}
