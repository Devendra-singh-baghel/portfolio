"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const HeroDust = dynamic(
  () => import("@/components/hero-dust").then((mod) => mod.HeroDust),
  { ssr: false }
);

export function HeroDustLoader() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    // Respect prefers-reduced-motion: never load if enabled
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return;
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShouldLoad(false);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Defer loading until after window load and during idle time to protect LCP
    const queueLoad = () => {
      const scheduleIdle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback
          : (cb: () => void) => setTimeout(cb, 100);

      scheduleIdle(() => {
        setShouldLoad(true);
      });
    };

    if (document.readyState === "complete") {
      queueLoad();
    } else {
      window.addEventListener("load", queueLoad, { once: true });
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("load", queueLoad);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <HeroDust />;
}
