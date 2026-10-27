"use client";

import * as React from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("./motion-features").then((res) => res.default);

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
