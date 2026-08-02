import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { Reveal } from "@/components/site/parallax";
import { humanise } from "@/components/site/premium-card";
import { usePublicCourses } from "@/hooks/use-public-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/training/")({
  head: () => ({
    meta: [
      { title: "Academy — Practitioner-Led Training | Turnpike Analyst" },
      {
        name: "description",
        content:
          "Enterprise content and automation training tracks taught by practising consultants. Browse levels, durations and pricing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Academy — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Practitioner-led courses published live from the Turnpike Analyst training catalogue.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  const courses = usePublicCourses();
  const [level, setLevel] = useState("all");

  const levels = useMemo(
    () => ["all", ...Array.from(new Set((courses.data ?? []).map((course) => course.level)))],
    [courses.data],
  );

  const items = (courses.data ?? []).filter((course) => level === "all" || course.level === level);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-cyan/30 px-4 md:px-8 py-8 pt-32">
      {/* Hero Section Container */}
      <section className="mx-auto max-w-[1400px]">
        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          
          <Reveal className="flex-1 relative z-10 w-full">
            <div className="flex flex-col mb-8">
              <span className="text-white font-bold uppercase tracking-widest text-sm mb-4">
                Academy
              </span>
              <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                <span className="whitespace-nowrap">Practitioner-led</span> <br />
                training tracks
              </h1>
            </div>
            
            <p className="mt-8 text-xl leading-relaxed text-slate-200 max-w-lg mb-10">
              Learn the same delivery patterns our consultants use on live regulated estates.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex-1 relative hidden lg:flex justify-end items-center">
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 w-full max-w-[600px]"
            >
              <img src="/images/bold_hero.png" alt="Illustration" className="w-full h-auto object-contain" />
            </motion.div>
          </Reveal>
          
          {/* Tagline pills like the reference image */}
          <div className="absolute bottom-10 left-10 lg:left-24 hidden md:flex items-center gap-4 bg-slate-900 px-6 py-4 rounded-full border border-slate-800">
            <span className="px-5 py-2 rounded-full border border-slate-700 text-slate-300 text-sm tracking-wide">Practitioner-led</span>
            <span className="px-5 py-2 rounded-full border border-slate-700 text-slate-300 text-sm tracking-wide">Live Regulated</span>
            <span className="px-5 py-2 rounded-full border border-slate-700 text-slate-300 text-sm tracking-wide">Enterprise</span>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="mx-auto max-w-[1400px] mt-16 md:mt-24 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">Popular Courses</h2>
            <p className="text-slate-600 text-lg max-w-md">Browse our catalogue of practitioner-led tracks. Filter by level to find your perfect fit.</p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
            {levels.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLevel(option)}
                className={cn(
                  "rounded-full border-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-all shadow-sm",
                  level === option
                    ? "border-brand-cyan bg-brand-cyan text-slate-950"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {option === "all" ? "All levels" : humanise(option)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((course, index) => (
            <Reveal key={course.slug} delay={index * 0.05}>
              <div className="group flex flex-col justify-between h-full rounded-[2rem] bg-white border border-slate-200 p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-cyan">
                      {humanise(course.category)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-base text-slate-600 line-clamp-2 mb-8">
                    {course.duration_hours} hours of practitioner-led delivery.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Level</span>
                    <span className="text-sm font-bold text-slate-800">{humanise(course.level)}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 p-4 text-white transition-all hover:bg-brand-cyan hover:text-slate-950 shadow-md hover:scale-105"
                  >
                    <ArrowRight className="size-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
          {courses.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 rounded-[2rem] bg-black/5 animate-pulse" />
              ))
            : null}
          {!courses.isLoading && items.length === 0 ? (
            <p className="text-lg text-slate-500 col-span-full text-center py-12">New cohorts are being scheduled.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}


