import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import heroTeam from "@/assets/hero-team.jpg.asset.json";


import {
  IconDoc,
  IconGear,
  IconMail,
  IconMedal,
  IconReport,
  IconRocket,
  IconTarget,
  MarkG,
  MarkM,
  MarkS,
  MarkSlack,
} from "@/components/site/hero-icons";

const NAV = [
  { label: "Why Turnpike", href: "#services" },
  { label: "Platforms", href: "#platforms" },
  { label: "Pricing", href: "#training" },
  { label: "Contact", href: "#contact" },
];

/** Badges arranged around the orbit ring: angle in degrees, size in px. */
const ORBIT = [
  { Icon: IconMail, angle: -128, size: 54 },
  { Icon: IconReport, angle: -38, size: 52 },
  { Icon: IconTarget, angle: 14, size: 50 },
  { Icon: IconRocket, angle: 168, size: 52 },
  { Icon: IconGear, angle: 62, size: 56 },
  { Icon: IconDoc, angle: 118, size: 48 },
];

export function HeroAJ() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section ref={ref} className="hero-aj relative overflow-hidden">
      {/* soft cream → lilac wash */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,#FFFFFF_0%,#F2FBF7_35%,#ECFAFB_68%,#E6F4FD_100%)] dark:opacity-0" />
      <div className="pointer-events-none absolute -left-24 top-1/3 size-[420px] rounded-full bg-[#34D399]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-[460px] rounded-full bg-[#0EA5E9]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:pb-24">

        <div className="mt-12 grid items-center gap-10 lg:mt-4 lg:grid-cols-[1.05fr_1fr]">
          {/* ---------- copy ---------- */}
          <motion.div style={{ y: copyY }} className="relative z-10">
            <h1 style={{ fontFamily: "var(--font-hero-display)" }} className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-[#0B2B33] dark:text-foreground sm:text-6xl xl:text-[4.4rem]">
              {["We Are Solution", "Oriented"].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line === "Oriented" ? (
                    <span className="inline-flex flex-wrap items-center gap-x-4">
                      <span>Oriented</span>
                      <HighlightWord word="Digital" />
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.29, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                Agency
                <TogglePill />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#4F6B72] dark:text-muted-foreground"
            >
              Enterprise content migration, intelligent automation and practitioner-led training —
              engineered for organisations that cannot afford to lose a single record.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-[#0B2B33] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(11,43,51,0.55)] hover:bg-[#11404c] transition-colors"
              >
                Get Started
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-[#10B981] px-8 py-3.5 text-sm font-semibold text-[#0EA5E9]"
              >
                How It Works
              </motion.a>
            </motion.div>

            <TrustedBy />
          </motion.div>

          {/* ---------- artwork ---------- */}
          <motion.div
            style={{ y: artY }}
            onPointerMove={(event) => {
              if (reduce) return;
              const rect = event.currentTarget.getBoundingClientRect();
              setTilt({
                x: ((event.clientX - rect.left) / rect.width - 0.5) * 16,
                y: ((event.clientY - rect.top) / rect.height - 0.5) * -16,
              });
            }}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[520px]"
          >
            <motion.div
              animate={{ rotateY: tilt.x, rotateX: tilt.y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              style={{ transformPerspective: 900 }}
              className="absolute inset-0"
            >
              {/* yellow disc + team photo */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-[10%] overflow-hidden rounded-full"
                style={{
                  maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 100%)"
                }}
              >
                <motion.img
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src="/team_portrait.png"
                  alt="Turnpike Analyst enterprise delivery team"
                  className="absolute inset-0 size-full object-cover object-[50%_30%] opacity-80"
                  loading="eager"
                />
                <span className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[#F2FBF7]/20" />
              </motion.div>

              {/* rotating orbit: ring + badges travel together */}
              <div className={reduce ? "absolute inset-0" : "orbit-spin absolute inset-0"}>
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
                  <circle cx="50" cy="50" r="47" fill="none" stroke="#10B981" strokeWidth="0.5" />
                </svg>

                {ORBIT.map(({ Icon, angle, size }, index) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={index}
                      className="absolute grid place-items-center rounded-2xl"
                      style={{
                        width: size,
                        height: size,
                        left: `${50 + Math.cos(rad) * 49}%`,
                        top: `${50 + Math.sin(rad) * 49}%`,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.09, type: "spring", stiffness: 180, damping: 14 }}
                    >
                      {/* counter-rotate so icons stay upright while orbiting */}
                      <div className={reduce ? "size-full" : "orbit-spin-rev size-full"}>
                        <motion.div className="size-full" whileHover={{ scale: 1.22, rotate: 6 }}>
                          <div
                            className="float-y size-full drop-shadow-[0_10px_18px_rgba(11,43,51,0.18)]"
                            style={{ animationDelay: `${index * 0.4}s`, animationDuration: `${3.6 + index * 0.4}s` }}
                          >
                            <Icon className="size-full" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>



              {/* awards card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                whileHover={{ y: -6, rotate: -2 }}
                className="absolute -left-2 bottom-4 w-32 rounded-2xl bg-white p-4 text-center shadow-[0_22px_45px_-20px_rgba(11,43,51,0.28)] sm:-left-6"
              >
                <IconMedal className="mx-auto size-10" />
                <p className="mt-2 text-xs font-bold leading-tight text-[#0B2B33]">
                  Best Agency
                  <br />
                  Awards
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HighlightWord({ word }: { word: string }) {
  const corners = [
    { top: -5, left: -5 },
    { top: -5, right: -5 },
    { bottom: -5, left: -5 },
    { bottom: -5, right: -5 },
  ] as const;

  return (
    <span className="relative inline-block px-3 py-0.5 text-[#0EA5E9]">
      {/* even dashed selection box hugging the word */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-[#0EA5E9]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {corners.map((pos, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.05 + index * 0.05, type: "spring", stiffness: 320, damping: 15 }}
          className="pointer-events-none absolute size-[9px] border-[1.5px] border-[#0EA5E9] bg-white"
          style={pos}
        />
      ))}
      <span className="relative">{word}</span>
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 size-4 text-[#0EA5E9]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 260, damping: 14 }}
      >
        <path d="M4 2 20 12l-7 1.6L10 21Z" fill="currentColor" />
      </motion.svg>
    </span>
  );
}


function TogglePill() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      aria-label="Toggle accent"
      onClick={() => setOn((value) => !value)}
      className="relative inline-flex h-9 w-24 items-center rounded-full bg-[#0B2B33] px-2 shadow-[0_10px_22px_-12px_rgba(11,43,51,0.6)]"
    >
      <motion.span
        animate={{ x: on ? 0 : 46 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="grid size-6 place-items-center rounded-full bg-[#34D399]"
      >
        <span className="size-2.5 rounded-full bg-[#0EA5E9]" />
      </motion.span>
      <motion.span
        animate={{ x: on ? 0 : -46 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="ml-auto size-3 rounded-full bg-[#0EA5E9]"
      />
    </button>
  );
}

function TrustedBy() {
  const marks = [MarkG, MarkS, MarkM, MarkSlack];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      className="relative mt-12"
    >
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-semibold text-[#0B2B33] dark:text-slate-200">Trusted By</span>
        {marks.map((Mark, index) => (
          <motion.span
            key={index}
            whileHover={{ y: -4, scale: 1.08 }}
            className="grid size-11 place-items-center rounded-full bg-white shadow-[0_12px_26px_-14px_rgba(11,43,51,0.35)]"
          >
            <Mark className="size-5" />
          </motion.span>
        ))}
      </div>

      <svg
        viewBox="0 0 320 70"
        className="pointer-events-none mt-2 h-16 w-full max-w-sm overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d="M4 58C34 58 40 22 66 22s30 30 56 30 34-34 62-34 40 24 68 24 34-14 62-14"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="66"
          cy="22"
          r="5"
          fill="#22C55E"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.25, 1] }}
          transition={{ delay: 1.9, duration: 0.7 }}
        />
        <text x="52" y="10" fontSize="11" fontWeight="700" fill="#22C55E">
          90%
        </text>
      </svg>
    </motion.div>
  );
}
