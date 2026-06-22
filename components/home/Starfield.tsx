"use client";

import { CSSProperties, useMemo } from "react";

/** Tiny deterministic PRNG so the star layout is identical on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  style: CSSProperties;
  bright: boolean;
};

const COUNT = 112;

// Warm + cool whites so the field has depth instead of one flat tone.
const TINTS = ["#fffdf7", "#fff", "#eaf2ff", "#fff4e6", "#f3ecff"];

function buildStars(): Star[] {
  const rand = mulberry32(20240622);
  const stars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    // Bias toward the upper sky; thin out near the bottom where the content sits.
    const top = Math.pow(rand(), 1.5) * 80;
    const brightness = rand();
    const bright = brightness > 0.82; // ~18% get the sparkling cross-flare
    const size = bright ? 2 + rand() * 1.8 : 0.8 + rand() * 1.8;
    const tint = TINTS[Math.floor(rand() * TINTS.length)];
    stars.push({
      bright,
      style: {
        left: `${rand() * 100}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: tint,
        boxShadow: `0 0 ${2 + brightness * 7}px rgba(255,253,247,${0.4 + brightness * 0.55})`,
        ["--star-dur" as string]: `${(bright ? 2.5 : 3.5) + rand() * 5}s`,
        ["--star-delay" as string]: `${rand() * 7}s`,
        ["--star-min" as string]: 0.06 + rand() * 0.2,
        ["--star-max" as string]: 0.6 + brightness * 0.4,
      },
    });
  }
  return stars;
}

export default function Starfield() {
  const stars = useMemo(buildStars, []);
  return (
    <div
      className="star-field absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span key={i} className={s.bright ? "star star-bright" : "star"} style={s.style} />
      ))}
    </div>
  );
}
