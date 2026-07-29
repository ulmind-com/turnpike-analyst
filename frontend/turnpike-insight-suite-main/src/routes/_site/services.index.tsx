import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/parallax";
import { PremiumCardSkeleton, ServiceCard, humanise } from "@/components/site/premium-card";
import { Section, SectionHeading } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicServices } from "@/hooks/use-public-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/services/")({
  head: () => ({
    meta: [
      { title: "Services — Turnpike Analyst Content & Automation Practice" },
      {
        name: "description",
        content:
          "Explore Turnpike Analyst service capabilities across ECM migration, intelligent automation and platform engineering for regulated organisations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Services — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Practice areas our consultants are actively delivering, published live from the platform.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function FilterPills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur transition-colors",
            value === option
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-white/50 bg-white/40 text-muted-foreground hover:text-foreground",
          )}
        >
          {option === "all" ? "All" : humanise(option)}
        </button>
      ))}
    </div>
  );
}

function ServicesPage() {
  const services = usePublicServices();
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set((services.data ?? []).map((s) => s.parent_category)))],
    [services.data],
  );

  const items = (services.data ?? []).filter(
    (service) => category === "all" || service.parent_category === category,
  );

  return (
    <>
      <Section className="pt-28">
        <SectionHeading
          eyebrow="Services"
          title="Content and automation capability, delivered end to end"
          description="Every practice area published live from the Turnpike Analyst platform catalogue."
        />
        <FilterPills options={categories} value={category} onChange={setCategory} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
          {services.isLoading
            ? Array.from({ length: 6 }).map((_, index) => <PremiumCardSkeleton key={index} />)
            : null}
          {!services.isLoading && items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No services match this filter yet.</p>
          ) : null}
        </div>
      </Section>
      <WaveDivider variant="wave" />
    </>
  );
}
