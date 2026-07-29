import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Layers } from "lucide-react";
import { motion } from "motion/react";

import { humanise } from "@/components/site/premium-card";
import { Reveal } from "@/components/site/parallax";
import { Section } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicService, usePublicServices } from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/services/$slug")({
  head: () => ({
    meta: [
      { title: "Service detail — Turnpike Analyst" },
      {
        name: "description",
        content:
          "Delivery scope, supported platforms and engagement model for this Turnpike Analyst service capability.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Service detail — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Delivery scope and supported platforms for this Turnpike Analyst capability.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = usePublicService(slug);
  const all = usePublicServices();

  const related = (all.data ?? [])
    .filter((item) => item.slug !== slug && item.parent_category === service.data?.parent_category)
    .slice(0, 3);

  return (
    <>
      <Section className="pt-28">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          All services
        </Link>

        {service.isLoading ? (
          <div className="mt-8 h-64 animate-pulse rounded-[2rem] bg-white/50" />
        ) : service.data ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
                <Layers className="size-3.5" />
                {humanise(service.data.parent_category)}
              </span>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {service.data.title}
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {service.data.short_description}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <Reveal className="rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur-xl">
                <h2 className="font-display text-xl font-semibold tracking-tight">Delivery scope</h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {service.data.full_description}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="space-y-4">
                <div className="rounded-[2rem] border border-white/60 bg-white/60 p-7 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Discipline
                  </p>
                  <p className="font-display mt-1 text-lg font-semibold">
                    {humanise(service.data.sub_service_type)}
                  </p>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Supported platforms
                  </p>
                  <ul className="mt-3 space-y-2">
                    {(service.data.supported_platforms ?? []).map((platform) => (
                      <li key={platform} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        {platform}
                      </li>
                    ))}
                    {!service.data.supported_platforms?.length ? (
                      <li className="text-sm text-muted-foreground">Platform-agnostic engagement.</li>
                    ) : null}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-105"
                >
                  Discuss this service
                </Link>
              </Reveal>
            </div>

            {related.length ? (
              <div className="mt-16">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Related capability</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {related.map((item, index) => (
                    <Reveal key={item.slug} delay={index * 0.06}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: item.slug }}
                        className="group block h-full rounded-[1.75rem] border border-white/60 bg-white/55 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                      >
                        <p className="font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {item.short_description}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">This service is no longer published.</p>
        )}
      </Section>
      <WaveDivider variant="wave" />
    </>
  );
}
