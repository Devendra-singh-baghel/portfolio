"use client";

import * as React from "react";

const PHRASES = [
  "FULL-STACK DEVELOPER",
  "BACKEND DEVELOPER",
  "FRONTEND DEVELOPER",
] as const;

const INITIAL_HOLD_MS = 3000;
const HOLD_AFTER_TYPING_MS = 2000;
const TYPE_SPEED_MS = 55;
const BACKSPACE_SPEED_MS = 25;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeMounted() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

export function TypingEyebrow() {
  const [displayedText, setDisplayedText] = React.useState<string>(PHRASES[0]);

  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const isMounted = React.useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot
  );

  const containerRef = React.useRef<HTMLSpanElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const stateRef = React.useRef({
    phraseIndex: 0,
    charIndex: PHRASES[0].length,
    phase: "initial_hold" as "initial_hold" | "deleting" | "typing" | "hold",
    isTabVisible: true,
    isInView: true,
  });

  React.useEffect(() => {
    if (prefersReducedMotion) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // State machine step function driven by setTimeout chains
    const step = () => {
      const state = stateRef.current;
      if (!state.isTabVisible || !state.isInView) {
        return;
      }

      const currentPhrase = PHRASES[state.phraseIndex];

      if (state.phase === "initial_hold" || state.phase === "hold") {
        state.phase = "deleting";
        timerRef.current = setTimeout(step, BACKSPACE_SPEED_MS);
        return;
      }

      if (state.phase === "deleting") {
        if (state.charIndex > 0) {
          state.charIndex -= 1;
          setDisplayedText(currentPhrase.slice(0, state.charIndex));
          timerRef.current = setTimeout(step, BACKSPACE_SPEED_MS);
        } else {
          state.phraseIndex = (state.phraseIndex + 1) % PHRASES.length;
          state.phase = "typing";
          timerRef.current = setTimeout(step, TYPE_SPEED_MS);
        }
        return;
      }

      if (state.phase === "typing") {
        const targetPhrase = PHRASES[state.phraseIndex];
        if (state.charIndex < targetPhrase.length) {
          state.charIndex += 1;
          setDisplayedText(targetPhrase.slice(0, state.charIndex));
          timerRef.current = setTimeout(step, TYPE_SPEED_MS);
        } else {
          state.phase = "hold";
          timerRef.current = setTimeout(step, HOLD_AFTER_TYPING_MS);
        }
        return;
      }
    };

    // Schedule initial hold
    timerRef.current = setTimeout(step, INITIAL_HOLD_MS);

    // Document visibility listener
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      stateRef.current.isTabVisible = isVisible;
      if (isVisible) {
        if (stateRef.current.isInView) {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(step, 100);
        }
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // IntersectionObserver to pause when hero is scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if (containerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const inView = entry ? entry.isIntersecting : true;
          stateRef.current.isInView = inView;
          if (inView) {
            if (stateRef.current.isTabVisible) {
              if (timerRef.current) clearTimeout(timerRef.current);
              timerRef.current = setTimeout(step, 100);
            }
          } else if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer) observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prefersReducedMotion]);

  const showCaret = isMounted && !prefersReducedMotion;
  const currentText = prefersReducedMotion ? PHRASES[0] : displayedText;

  return (
    <span ref={containerRef} className="inline-flex items-center">
      {/* Static text for screen readers */}
      <span className="sr-only">Full-stack developer</span>

      {/* Visual typewriter container: reserves longest width */}
      <span
        aria-hidden="true"
        className="inline-grid [grid-template-areas:'stack'] items-center justify-items-start"
      >
        {/* Invisible sizing anchor: reserves the width of the longest phrase (FULL-STACK DEVELOPER) */}
        <span className="invisible select-none pointer-events-none opacity-0 [grid-area:stack]">
          FULL-STACK DEVELOPER
        </span>

        {/* Typed text and caret */}
        <span className="[grid-area:stack] flex items-center justify-start whitespace-nowrap">
          <span>{currentText}</span>
          {showCaret && (
            <span
              aria-hidden="true"
              className="typing-caret ml-1 inline-block w-[1.5px] h-[1em] bg-foreground/80 align-middle"
            />
          )}
        </span>
      </span>
    </span>
  );
}
