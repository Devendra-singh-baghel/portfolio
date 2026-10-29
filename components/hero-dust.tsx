"use client";

import * as React from "react";
import portrait from "@/public/images/profile.png";

// Seeded PRNG (mulberry32) for deterministic, reproducible particle behavior
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Yield execution to the browser between row chunks to avoid long tasks (>50ms)
function yieldToBrowser(): Promise<void> {
  if (
    typeof globalThis !== "undefined" &&
    "scheduler" in globalThis &&
    typeof (globalThis as unknown as { scheduler: { yield: () => Promise<void> } }).scheduler?.yield === "function"
  ) {
    return (globalThis as unknown as { scheduler: { yield: () => Promise<void> } }).scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

const BUCKET_COUNT = 32;
const BUCKET_COLORS = Array.from({ length: BUCKET_COUNT }, (_, i) => {
  const g = Math.round((i + 0.5) * (255 / BUCKET_COUNT));
  return `rgb(${g},${g},${g})`;
});

// Scroll fraction of hero height over which the whole dissolve plays
const SCROLL_RANGE = 0.45;
// Particle start delays are spread over [0, MAX_DELAY] (in progress units)
const MAX_DELAY = 0.45;
// Each particle lives for LIFETIME progress units
const LIFETIME = 0.5;
// Progress at which every particle has fully faded
const DONE_P = MAX_DELAY + LIFETIME; // 0.95

interface ParticleBuffers {
  count: number;
  originX: Float32Array;
  originY: Float32Array;
  size: Float32Array;
  grayBucket: Uint8Array;
  baseAlpha: Float32Array;
  delay: Float32Array;
  driftVx: Float32Array;
  driftVy: Float32Array;
  rotSpeed: Float32Array;
  wobblePhase: Float32Array;
  isPaperBit: Uint8Array;
  aspect: Float32Array;
  bucketIndices: number[][];
}

export function HeroDust() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<{
    destroyed: boolean;
    rafId: number | null;
    isIntersecting: boolean;
    targetP: number;
    currentP: number;
    degradeLevel: number; // 0 = normal, 1 = half particles, 2 = cheap CSS fallback
    activeFrames: number;
    frameTimes: number[];
    lastFrameTimestamp: number;
    buffers: ParticleBuffers | null;
    offscreenCanvas: HTMLCanvasElement | null;
    canvasDevW: number;
    canvasDevH: number;
    offsetDevX: number;
    offsetDevY: number;
    devW: number;
    devH: number;
    dpr: number;
    isMobile: boolean;
    heroElement: HTMLElement | null;
    portraitContainer: HTMLElement | null;
    debugDiffTested: boolean;
  }>({
    destroyed: false,
    rafId: null,
    isIntersecting: true,
    targetP: 0,
    currentP: 0,
    degradeLevel: 0,
    activeFrames: 0,
    frameTimes: [],
    lastFrameTimestamp: 0,
    buffers: null,
    offscreenCanvas: null,
    canvasDevW: 0,
    canvasDevH: 0,
    offsetDevX: 0,
    offsetDevY: 0,
    devW: 0,
    devH: 0,
    dpr: 1,
    isMobile: false,
    heroElement: null,
    portraitContainer: null,
    debugDiffTested: false,
  });

  const [canvasLayout, setCanvasLayout] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>({ top: 0, left: 0, width: 0, height: 0 });

  React.useEffect(() => {
    const s = stateRef.current;
    s.destroyed = false;

    const hero = document.getElementById("hero");
    s.heroElement = hero;
    const portraitContainer = canvasRef.current?.parentElement || null;
    s.portraitContainer = portraitContainer;

    const isDebug =
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined" &&
      window.location.search.includes("dustdebug=1");

    // Initialize baking and canvas setup
    async function initDust() {
      if (!portraitContainer || !canvasRef.current || s.destroyed) return;

      const rect = portraitContainer.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const isMobile = window.innerWidth < 768;
      s.isMobile = isMobile;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);
      s.dpr = dpr;

      // Expand canvas boundaries so blowing particles are not clipped
      const padTop = isMobile ? 130 : 220;
      const padRight = isMobile ? 160 : 280;
      const padLeft = isMobile ? 25 : 40;
      const padBottom = 0;

      const boxW = rect.width;
      const boxH = rect.height;

      setCanvasLayout({
        top: -padTop,
        left: -padLeft,
        width: boxW + padLeft + padRight,
        height: boxH + padTop + padBottom,
      });

      const canvasDevW = Math.round((boxW + padLeft + padRight) * dpr);
      const canvasDevH = Math.round((boxH + padTop + padBottom) * dpr);
      const devW = Math.round(boxW * dpr);
      const devH = Math.round(boxH * dpr);
      const offsetDevX = Math.round(padLeft * dpr);
      const offsetDevY = Math.round(padTop * dpr);

      s.canvasDevW = canvasDevW;
      s.canvasDevH = canvasDevH;
      s.devW = devW;
      s.devH = devH;
      s.offsetDevX = offsetDevX;
      s.offsetDevY = offsetDevY;

      const mainCanvas = canvasRef.current;
      mainCanvas.width = canvasDevW;
      mainCanvas.height = canvasDevH;

      if (isDebug) {
        mainCanvas.style.mixBlendMode = "difference";
      }

      // Load static portrait image
      const img = new Image();
      img.src = portrait.src;
      if (!img.complete) {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }
      if (s.destroyed) return;

      // Offscreen portrait canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = devW;
      offscreen.height = devH;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Draw portrait matching object-contain object-bottom
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = devW / devH;
      let drawW = devW;
      let drawH = devH;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > boxRatio) {
        drawW = devW;
        drawH = devW / imgRatio;
        drawY = devH - drawH;
      } else {
        drawH = devH;
        drawW = devH * imgRatio;
        drawX = (devW - drawW) / 2;
        drawY = devH - drawH;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const imgData = offCtx.getImageData(0, 0, devW, devH);
      const data = imgData.data;

      // Mathematical constants matching hero CSS
      // Ellipse farthest-corner at 50% 40%:
      const cx = 0.5 * devW;
      const cy = 0.4 * devH;
      const rx = 0.70710678 * devW;
      const ry = 0.84852814 * devH;

      // Bottom fade overlay: bg-linear-to-t from-background via-background/60 to-transparent on bottom half
      const yMid = 0.5 * devH;
      const yThreeQuarter = 0.75 * devH;

      // Process pixels in small row slices (<12ms) to avoid long tasks
      const CHUNK_ROWS = isMobile ? 80 : 120;
      for (let yStart = 0; yStart < devH; yStart += CHUNK_ROWS) {
        if (s.destroyed) return;
        const yEnd = Math.min(devH, yStart + CHUNK_ROWS);

        for (let y = yStart; y < yEnd; y++) {
          const dy = (y - cy) / ry;
          const dySq = dy * dy;

          // Bottom fade piecewise overlay factor
          let fade = 0;
          if (y >= yThreeQuarter) {
            fade = 0.6 + 0.4 * ((y - yThreeQuarter) / (0.25 * devH));
          } else if (y >= yMid) {
            fade = 0.6 * ((y - yMid) / (0.25 * devH));
          }

          for (let x = 0; x < devW; x++) {
            const idx = (y * devW + x) * 4;
            const aRaw = data[idx + 3];
            if (aRaw === 0) continue;

            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // 1. Grayscale luminance
            let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            // 2. Contrast 1.1: (gray - 128) * 1.1 + 128
            gray = (gray - 128) * 1.1 + 128;

            // 3. Brightness 0.88
            gray = gray * 0.88;

            // 4. Dim overlay 25% bg-background (#0B0B0B = 11)
            gray = gray * 0.75 + 11 * 0.25;

            // 5. Radial mask: black 50%, transparent 80%
            const dx = (x - cx) / rx;
            const R = Math.sqrt(dx * dx + dySq);
            let maskAlpha = 1;
            if (R >= 0.8) {
              maskAlpha = 0;
            } else if (R > 0.5) {
              maskAlpha = (0.8 - R) / 0.3;
            }

            // 6. Composite with bottom fade toward #0B0B0B (11)
            const finalGray = Math.max(
              0,
              Math.min(255, Math.round(gray * (1 - fade) + 11 * fade))
            );
            const finalAlpha = Math.max(
              0,
              Math.min(255, Math.round(aRaw * maskAlpha * (1 - fade)))
            );

            data[idx] = finalGray;
            data[idx + 1] = finalGray;
            data[idx + 2] = finalGray;
            data[idx + 3] = finalAlpha;
          }
        }
        await yieldToBrowser();
      }

      offCtx.putImageData(imgData, 0, 0);
      s.offscreenCanvas = offscreen;

      // Sample grid cells as integer device pixels
      // Desktop target <= 12,000, Mobile target <= 5,000
      const cellDev = isMobile ? 6 : 5;

      interface ValidCell {
        x: number;
        y: number;
        avgGray: number;
        avgAlpha: number;
      }
      const validCells: ValidCell[] = [];

      for (let y = 0; y < devH; y += cellDev) {
        const cellH = Math.min(cellDev, devH - y);
        for (let x = 0; x < devW; x += cellDev) {
          const cellW = Math.min(cellDev, devW - x);

          let sumGray = 0;
          let sumAlpha = 0;
          let count = 0;

          for (let cy_ = 0; cy_ < cellH; cy_++) {
            for (let cx_ = 0; cx_ < cellW; cx_++) {
              const pIdx = ((y + cy_) * devW + (x + cx_)) * 4;
              sumGray += data[pIdx];
              sumAlpha += data[pIdx + 3];
              count++;
            }
          }

          const avgAlpha = sumAlpha / (count * 255);
          if (avgAlpha >= 0.05) {
            validCells.push({
              x,
              y,
              avgGray: Math.round(sumGray / count),
              avgAlpha,
            });
          }
        }
      }

      const totalParticles = validCells.length;
      const rng = mulberry32(1337);

      const originX = new Float32Array(totalParticles);
      const originY = new Float32Array(totalParticles);
      const size = new Float32Array(totalParticles);
      const grayBucket = new Uint8Array(totalParticles);
      const baseAlpha = new Float32Array(totalParticles);
      const delay = new Float32Array(totalParticles);
      const driftVx = new Float32Array(totalParticles);
      const driftVy = new Float32Array(totalParticles);
      const rotSpeed = new Float32Array(totalParticles);
      const wobblePhase = new Float32Array(totalParticles);
      const isPaperBit = new Uint8Array(totalParticles);
      const aspect = new Float32Array(totalParticles);
      const bucketIndices: number[][] = Array.from(
        { length: BUCKET_COUNT },
        () => []
      );

      let paperCount = 0;
      const maxPaperBits = Math.min(1500, Math.round(totalParticles * 0.14));

      for (let i = 0; i < totalParticles; i++) {
        const cell = validCells[i];
        originX[i] = cell.x;
        originY[i] = cell.y;
        size[i] = cellDev;
        baseAlpha[i] = cell.avgAlpha;

        const b = Math.min(
          BUCKET_COUNT - 1,
          Math.floor((cell.avgGray / 256) * BUCKET_COUNT)
        );
        grayBucket[i] = b;
        bucketIndices[b].push(i);

        // Normalized positions for wind sweep bias
        const u = cell.x / devW;
        const v = cell.y / devH;
        const sweepBias = 0.65 * (1 - u) + 0.35 * v;
        const r = rng();
        // Dissolve begins immediately (0) and cells detach across [0, MAX_DELAY]
        delay[i] = MAX_DELAY * (0.7 * sweepBias + 0.3 * r);

        // Wind trajectory parameters
        driftVx[i] = (0.75 + 0.5 * rng()) * dpr;
        driftVy[i] = (0.65 + 0.6 * rng()) * dpr;
        rotSpeed[i] = (rng() - 0.5) * 8;
        wobblePhase[i] = rng() * Math.PI * 2;

        const isPaper = rng() < 0.14 && paperCount < maxPaperBits;
        if (isPaper) {
          isPaperBit[i] = 1;
          aspect[i] = 1.0 + rng() * 0.8;
          paperCount++;
        } else {
          isPaperBit[i] = 0;
          aspect[i] = 1.0;
        }
      }

      s.buffers = {
        count: totalParticles,
        originX,
        originY,
        size,
        grayBucket,
        baseAlpha,
        delay,
        driftVx,
        driftVy,
        rotSpeed,
        wobblePhase,
        isPaperBit,
        aspect,
        bucketIndices,
      };

      if (process.env.NODE_ENV !== "production") {
        console.debug(
          `[HeroDust] Initialized ${totalParticles} particles (${paperCount} paper bits) in ${BUCKET_COUNT} gray buckets. DPR=${dpr}. Cell=${cellDev}px.`
        );
      }

      // Check debug difference mode
      if (isDebug && !s.debugDiffTested) {
        s.debugDiffTested = true;
        const ctx = mainCanvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasDevW, canvasDevH);
          ctx.drawImage(offscreen, offsetDevX, offsetDevY, devW, devH);
          mainCanvas.style.opacity = "1";

          // Sample difference over portrait area
          setTimeout(() => {
            try {
              const testData = ctx.getImageData(
                offsetDevX,
                offsetDevY,
                devW,
                devH
              ).data;
              let diffSum = 0;
              let sampleCount = 0;
              for (let i = 0; i < testData.length; i += 40) {
                if (testData[i + 3] > 20) {
                  diffSum +=
                    (testData[i] + testData[i + 1] + testData[i + 2]) / 3;
                  sampleCount++;
                }
              }
              const avgDiff = sampleCount > 0 ? diffSum / sampleCount : 0;
              console.debug(
                `[HeroDust Debug] ?dustdebug=1 difference check: average residual difference = ${avgDiff.toFixed(
                  2
                )} / 255 (ideal ~0).`
              );
            } catch {
              // CORS or test ignore
            }
          }, 300);
        }
      }

      // Trigger initial scroll calculation in case page loaded scrolled down
      updateScrollProgress();
    }

    function updateScrollProgress() {
      if (!s.heroElement) return;
      const heroHeight = s.heroElement.offsetHeight || window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const p =
        scrollY <= 4
          ? 0
          : Math.min(1, Math.max(0, scrollY / (heroHeight * SCROLL_RANGE)));
      s.targetP = p;

      // Start loop if not already running
      if (s.rafId === null) {
        s.lastFrameTimestamp = performance.now();
        s.rafId = requestAnimationFrame(renderLoop);
      }
    }

    function renderLoop(now: number) {
      if (s.destroyed) return;

      s.lastFrameTimestamp = now;

      // Loop smoothing
      const diff = s.targetP - s.currentP;
      if (Math.abs(diff) > 0.0005) {
        s.currentP += diff * 0.25;
      } else {
        s.currentP = s.targetP;
      }

      const p = s.currentP;
      const mainCanvas = canvasRef.current;
      const ctx = mainCanvas?.getContext("2d");

      if (ctx && s.buffers && s.offscreenCanvas && mainCanvas) {
        if (s.degradeLevel === 2) {
          // Level 2 cheap fallback: CSS-driven scroll opacity & transform
          if (s.heroElement) {
            s.heroElement.setAttribute("data-hero-dissolve", "fallback");
            s.heroElement.style.setProperty(
              "--fallback-opacity",
              String(Math.max(0, 1 - p * 1.4))
            );
            s.heroElement.style.setProperty(
              "--fallback-y",
              `${-p * 60}px`
            );
          }
          mainCanvas.style.opacity = "0";
          ctx.clearRect(0, 0, s.canvasDevW, s.canvasDevH);
          s.rafId = null;
          return;
        }

        // Active state management
        if (p <= 0.005 && s.targetP === 0) {
          // At top: restore normal Next.js image, hide canvas, reset any degradation
          s.currentP = 0;
          if (s.heroElement?.hasAttribute("data-hero-dissolve")) {
            s.heroElement.removeAttribute("data-hero-dissolve");
            s.heroElement.style.removeProperty("--fallback-opacity");
            s.heroElement.style.removeProperty("--fallback-y");
          }
          s.degradeLevel = 0;
          s.frameTimes = [];
          s.activeFrames = 0;
          mainCanvas.style.opacity = "0";
          ctx.clearRect(0, 0, s.canvasDevW, s.canvasDevH);
          s.rafId = null;
          return;
        }

        if (p >= DONE_P && s.targetP >= DONE_P) {
          // Past all particles: clear canvas and pause
          ctx.clearRect(0, 0, s.canvasDevW, s.canvasDevH);
          s.rafId = null;
          return;
        }

        // Canvas is actively rendering dissolve
        if (s.heroElement?.getAttribute("data-hero-dissolve") !== "active") {
          s.heroElement?.setAttribute("data-hero-dissolve", "active");
        }
        mainCanvas.style.opacity = "1";

        const renderStart = performance.now();

        // 1. Clear visible canvas
        ctx.clearRect(0, 0, s.canvasDevW, s.canvasDevH);

        // 2. Draw continuous base image
        ctx.drawImage(
          s.offscreenCanvas,
          s.offsetDevX,
          s.offsetDevY,
          s.devW,
          s.devH
        );

        // 3. Erase detached cells
        const b = s.buffers;
        const step = s.degradeLevel === 1 ? 2 : 1;
        const count = b.count;

        for (let i = 0; i < count; i += step) {
          if (p > b.delay[i]) {
            ctx.clearRect(
              s.offsetDevX + b.originX[i],
              s.offsetDevY + b.originY[i],
              b.size[i],
              b.size[i]
            );
          }
        }

        // 4. Emit moving particles (batched by 32 grayscale buckets)
        const dpr = s.dpr;
        const Dx = (s.isMobile ? 155 : 270) * dpr;
        const Dy = (s.isMobile ? 125 : 215) * dpr;
        const Wx = 15 * dpr;
        const Wy = 12 * dpr;

        for (let bucket = 0; bucket < BUCKET_COUNT; bucket++) {
          const indices = b.bucketIndices[bucket];
          if (indices.length === 0) continue;

          ctx.fillStyle = BUCKET_COLORS[bucket];

          for (let k = 0; k < indices.length; k += step) {
            const i = indices[k];
            const d = b.delay[i];
            if (p <= d) continue;

            const t = Math.min(1, Math.max(0, (p - d) / LIFETIME));
            const tPowX = Math.pow(t, 1.35);
            const tPowY = Math.pow(t, 1.2);

            const posX =
              s.offsetDevX +
              b.originX[i] +
              b.driftVx[i] * tPowX * Dx +
              Math.sin(t * 18.8495 + b.wobblePhase[i]) * Wx * t;
            const posY =
              s.offsetDevY +
              b.originY[i] -
              b.driftVy[i] * tPowY * Dy +
              Math.cos(t * 15.7079 + b.wobblePhase[i]) * Wy * t;

            const alpha = b.baseAlpha[i] * (1 - Math.pow(t, 1.4));
            if (alpha <= 0.01) continue;
            ctx.globalAlpha = alpha;

            const sPix = b.size[i] * (1 - 0.35 * t);

            if (b.isPaperBit[i]) {
              const angle = b.rotSpeed[i] * t * 9.4247;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);
              const w = sPix * b.aspect[i];
              const h = sPix;
              ctx.setTransform(cos, sin, -sin, cos, posX, posY);
              ctx.fillRect(-w / 2, -h / 2, w, h);
              ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
              ctx.fillRect(posX, posY, sPix, sPix);
            }
          }
        }

        const renderDuration = performance.now() - renderStart;

        // Frame timing monitor for active canvas execution
        if (s.activeFrames > 20) {
          s.frameTimes.push(renderDuration);
          if (s.frameTimes.length > 30) s.frameTimes.shift();

          // Only evaluate degradation when we have a full window of 30 active frames
          if (s.frameTimes.length >= 30) {
            const avgRenderTime =
              s.frameTimes.reduce((a, b) => a + b, 0) / s.frameTimes.length;

            if (avgRenderTime > 24) {
              if (s.degradeLevel === 0) {
                s.degradeLevel = 1;
                s.frameTimes = [];
                if (process.env.NODE_ENV !== "production") {
                  console.debug(
                    `[HeroDust] High render time (${avgRenderTime.toFixed(
                      1
                    )}ms). Degrade Level 1: halving particle count.`
                  );
                }
              } else if (s.degradeLevel === 1) {
                s.degradeLevel = 2;
                if (process.env.NODE_ENV !== "production") {
                  console.debug(
                    `[HeroDust] Degrade Level 2: falling back to CSS transform.`
                  );
                }
              }
            }
          }
        }
        s.activeFrames++;
      }

      // Continue loop if not settled
      if (Math.abs(s.targetP - s.currentP) > 0.0005 && s.isIntersecting) {
        s.rafId = requestAnimationFrame(renderLoop);
      } else {
        s.rafId = null;
      }
    }

    // Scroll listener (passive)
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    // IntersectionObserver to pause loop when hero is out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        s.isIntersecting = entry.isIntersecting;
        if (s.isIntersecting && Math.abs(s.targetP - s.currentP) > 0.0005) {
          if (s.rafId === null) {
            s.lastFrameTimestamp = performance.now();
            s.rafId = requestAnimationFrame(renderLoop);
          }
        }
      },
      { threshold: 0 }
    );
    if (s.heroElement) {
      observer.observe(s.heroElement);
    }

    // Visibility change listener
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (s.rafId !== null) {
          cancelAnimationFrame(s.rafId);
          s.rafId = null;
        }
      } else if (
        s.isIntersecting &&
        Math.abs(s.targetP - s.currentP) > 0.0005
      ) {
        s.lastFrameTimestamp = performance.now();
        s.rafId = requestAnimationFrame(renderLoop);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initDust();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    initDust();

    return () => {
      s.destroyed = true;
      if (s.rafId !== null) {
        cancelAnimationFrame(s.rafId);
        s.rafId = null;
      }
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      if (s.heroElement?.getAttribute("data-hero-dissolve") === "active") {
        s.heroElement.removeAttribute("data-hero-dissolve");
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute z-20 transition-none"
      style={{
        top: `${canvasLayout.top}px`,
        left: `${canvasLayout.left}px`,
        width: `${canvasLayout.width}px`,
        height: `${canvasLayout.height}px`,
        opacity: 0,
      }}
    />
  );
}
