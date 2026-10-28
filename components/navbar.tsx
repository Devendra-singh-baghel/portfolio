"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { cn } from "@/lib/utils";

const DESKTOP_NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Case Study", href: "/#case-study" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
];

const MOBILE_NAV_LINKS = [
  ...DESKTOP_NAV_LINKS,
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const headerRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close mobile menu on Escape key press and return focus to hamburger button
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close mobile menu on outside click/pointerdown
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  // Scroll spy to detect active section
  React.useEffect(() => {
    if (!isHome) {
      return;
    }

    const sectionIds = [
      "about",
      "experience",
      "case-study",
      "skills",
      "projects",
      "education",
      "contact",
    ];

    const handleScroll = () => {
      // If at the bottom of the page, activate the last section ("contact")
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        setActiveSection("contact");
        return;
      }

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

  // Update URL hash with history.replaceState as active section changes
  React.useEffect(() => {
    if (!isHome) {
      return;
    }

    if (activeSection) {
      const newHash = `#${activeSection}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
      }
    } else if (window.scrollY < 200 && window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, [activeSection, isHome]);

  const isContactActive = isHome && activeSection === "contact";

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className="fixed top-4 inset-x-0 z-40 mx-auto w-[calc(100%-2rem)] max-w-5xl"
      >
        {/* Floating pill navigation bar */}
        <div className="nav-drop-in flex items-center justify-between rounded-full border border-border bg-background/60 px-4 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6">
          <Link
            href="/"
            className="rounded-full font-serif text-base tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
          >
            Devendra Singh Baghel
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {DESKTOP_NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = isHome && activeSection === sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:px-3 xl:text-sm",
                    isActive
                      ? "text-foreground"
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

          {/* Right side: Contact CTA on desktop, Menu toggle on mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              aria-current={isContactActive ? "location" : undefined}
              className={cn(
                "hidden items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:inline-flex xl:px-4 xl:text-sm",
                isContactActive &&
                  "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              <span>Contact</span>
              <ArrowUpRight className="size-3.5 xl:size-4" aria-hidden="true" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <span>{isOpen ? "Close" : "Menu"}</span>
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <m.nav
              key="mobile-nav"
              id="mobile-navigation"
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 w-full rounded-2xl border border-border bg-background/95 p-3 shadow-xl shadow-black/40 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {MOBILE_NAV_LINKS.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = isHome && activeSection === sectionId;
                  const isContact = sectionId === "contact";
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive
                          ? "bg-secondary font-medium text-foreground"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                        isContact &&
                          isActive &&
                          "bg-primary font-medium text-primary-foreground hover:bg-primary/90",
                        isContact &&
                          !isActive &&
                          "font-medium text-foreground hover:bg-secondary"
                      )}
                    >
                      <span>{link.label}</span>
                      {isContact ? (
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      ) : (
                        isActive && (
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-primary"
                          />
                        )
                      )}
                    </Link>
                  );
                })}
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
