"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    if (!isHome) {
      return;
    }

    const sectionIds = ["work", "about", "skills", "experience", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="rounded-sm font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Devendra Singh Baghel
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = isHome && activeSection === sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-primary"
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="border-t border-border bg-background/95 px-4 py-4 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("/#", "");
                const isActive = isHome && activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
