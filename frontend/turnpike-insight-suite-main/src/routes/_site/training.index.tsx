import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/parallax";
import { PremiumCard, PremiumCardSkeleton, humanise } from "@/components/site/premium-card";
import { Section, SectionHeading } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { AnimatedOrbital } from "@/components/ui/animated-orbital";
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
    <>
      <Section className="pt-28">
        <SectionHeading
          eyebrow="Academy"
          title="Practitioner-led training tracks"
          description="Learn the same delivery patterns our consultants use on live regulated estates."
        />

        <div className="mb-16 mt-8 flex justify-center">
          <AnimatedOrbital />
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {levels.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLevel(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur transition-colors",
                level === option
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-white/50 bg-white/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {option === "all" ? "All levels" : humanise(option)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((course, index) => (
            <Reveal key={course.slug} delay={index * 0.05}>
              <PremiumCard
                bookmarkable
                icon={<GraduationCap className="size-5" />}
                title={course.title}
                description={`${humanise(course.category)} track · $${course.price.toLocaleString()} · ${course.duration_hours} hours of practitioner-led delivery.`}
                meta={[
                  { label: "Track", value: humanise(course.category) },
                  { label: "Level", value: humanise(course.level) },
                  { label: "Duration", value: `${course.duration_hours}h` },
                ]}
              >
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
                >
                  Enrol interest
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
          {courses.isLoading
            ? Array.from({ length: 6 }).map((_, index) => <PremiumCardSkeleton key={index} />)
            : null}
          {!courses.isLoading && items.length === 0 ? (
            <p className="text-sm text-muted-foreground">New cohorts are being scheduled.</p>
          ) : null}
        </div>
      </Section>
      <WaveDivider variant="peaks" />
    </>
  );
}
