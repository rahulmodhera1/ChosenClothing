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

type Star = CSSProperties & {
  "--star-dur": string;
  "--star-delay": string;
  "--star-min": number;
  "--star-max": number;
};

const COUNT = 70;

function buildStars(): Star[] {
  const rand = mulberry32(20240622);
  const stars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    // Bias toward the upper sky; thin out near the bottom where the content sits.
    const top = Math.pow(rand(), 1.4) * 78;
    const size = 1 + rand() * 2.2;
    const bright = rand();
    stars.push({
      left: `${rand() * 100}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      boxShadow: `0 0 ${2 + bright * 5}px rgba(255,253,247,${0.4 + bright * 0.5})`,
      "--star-dur": `${3 + rand() * 5}s`,
      "--star-delay": `${rand() * 6}s`,
      "--star-min": 0.08 + rand() * 0.22,
      "--star-max": 0.6 + bright * 0.4,
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
      {stars.map((style, i) => (
        <span key={i} className="star" style={style} />
      ))}
    </div>
  );
}
