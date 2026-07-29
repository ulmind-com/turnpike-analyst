import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Vertical journey with a scroll-drawn progress line. */
export function JourneyTimeline({
  items,
}: {
  items: readonly { year: string; title: string; body: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-10 sm:pl-14">
      <div aria-hidden className="absolute left-3 top-2 h-full w-px bg-border/60 sm:left-5" />
      <motion.div
        aria-hidden
        style={{ height }}
        className="absolute left-3 top-2 w-px bg-[linear-gradient(180deg,var(--primary),var(--brand-cyan))] sm:left-5"
      />

      <div className="space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <span
              aria-hidden
              className="absolute -left-[1.85rem] top-1.5 grid size-4 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] ring-4 ring-background transition-transform duration-300 group-hover:scale-125 sm:-left-[2.35rem]"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.year}</p>
            <h3 className="font-display mt-1 text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
