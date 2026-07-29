import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { humanise } from "@/components/site/premium-card";
import { cn } from "@/lib/utils";
import type { ServiceResponse } from "@/types/api";

import { ServiceGlyph } from "@/components/site/service-glyph";

function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <h2 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={reduced ? undefined : { opacity: 0, y: "0.5em", filter: "blur(6px)" }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: index * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </h2>
  );
}

export function ServicesExplorer({
  services,
  eyebrow = "Our services",
  title = "Which service does your business need right now?",
  loading = false,
}: {
  services: readonly ServiceResponse[];
  eyebrow?: string;
  title?: string;
  loading?: boolean;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, ServiceResponse[]>();
    for (const service of services) {
      const key = service.parent_category;
      map.set(key, [...(map.get(key) ?? []), service]);
    }
    return Array.from(map, ([key, items]) => ({ key, label: humanise(key), items }));
  }, [services]);

  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!groups.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
    );
    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [groups.length]);

  const goTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      {/* Rail */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-5 lg:overflow-visible lg:px-0">
          {groups.map((group, index) => (
            <button
              key={group.key}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "group relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-left text-sm transition-all duration-300",
                "lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:text-base",
                active === index
                  ? "border-transparent bg-primary text-primary-foreground lg:bg-transparent lg:font-bold lg:text-white"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-white lg:bg-transparent",
              )}
            >
              <span className="lg:flex lg:items-center lg:gap-3">
                <span className="tabular-nums">{index + 1}.</span>
                <span>{group.label}</span>
              </span>
              {active === index ? (
                <motion.span
                  layoutId="services-rail-indicator"
                  className="absolute -left-4 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,var(--primary),var(--brand-cyan))] lg:block"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center rounded-md border border-dashed border-primary/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
        >
          {eyebrow}
        </motion.span>

        <WordReveal
          text={title}
          className="font-display mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        />

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-2xl bg-white/50" />
            ))}
          </div>
        ) : null}

        <div className="mt-12 space-y-16">
          {groups.map((group, groupIndex) => (
            <div
              key={group.key}
              data-index={groupIndex}
              ref={(node) => {
                sectionRefs.current[groupIndex] = node;
              }}
              className="scroll-mt-32"
            >
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {group.label}
              </motion.h3>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 h-px origin-left bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_45%,transparent),transparent)]"
              />

              <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                {group.items.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="group relative flex h-full flex-col overflow-hidden px-0 py-7 transition-colors md:px-6"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(120% 90% at 20% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 65%), radial-gradient(120% 100% at 90% 100%, color-mix(in oklab, var(--brand-cyan) 16%, transparent), transparent 62%)",
                        }}
                      />
                      <span className="relative text-primary transition-transform duration-500 group-hover:-translate-y-1">
                        <ServiceGlyph seed={service.sub_service_type} />
                      </span>
                      <h4 className="font-display relative mt-6 text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-primary">
                        {service.title}
                      </h4>
                      <p className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
                        {service.short_description}
                      </p>
                      <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        Explore
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
