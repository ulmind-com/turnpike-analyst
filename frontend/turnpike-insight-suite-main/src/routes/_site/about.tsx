import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target } from "lucide-react";
import { motion } from "motion/react";

import { AwardsStrip } from "@/components/site/awards-strip";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { Reveal } from "@/components/site/parallax";
import { Section, SectionHeading } from "@/components/site/section";
import { CounterBand, StatBand } from "@/components/site/stat-band";
import { WaveDivider } from "@/components/site/wave-divider";
import {
  AWARDS,
  COUNTERS,
  IMPACT_STATS,
  JOURNEY,
  LEADERSHIP,
} from "@/content/site-content";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Turnpike Analyst — ECM, ETL & ESB Specialists" },
      {
        name: "description",
        content:
          "Two decades of enterprise content migration, integration and automation. Our story, mission, leadership and the milestones behind Turnpike Analyst.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "About Turnpike Analyst — ECM, ETL & ESB Specialists" },
      {
        property: "og:description",
        content:
          "Engineering-led ECM migration, automation and enablement for regulated organisations worldwide.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="About Turnpike Analyst"
          title="What we build — and why enterprises trust us with their content estates"
          description="Turnpike Analyst is a global ECM, ETL and ESB specialist. We migrate, modernise and automate the content platforms that regulated organisations cannot afford to get wrong."
        />
        <Reveal>
          <StatBand items={IMPACT_STATS} />
        </Reveal>
      </Section>

      <WaveDivider variant="layered" />

      <Section className="bg-card/10">
        <SectionHeading eyebrow="Mission & Vision" title="Our mission and vision" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: <Target className="size-5" />,
              title: "Our Mission",
              body: "To make platform modernisation accessible to every organisation that depends on its content — whether you are retiring a legacy archive, consolidating four repositories into one, or automating an estate that runs 24/7. Every engagement is a commitment to deliver something measurable, not a deck.",
            },
            {
              icon: <Eye className="size-5" />,
              title: "Our Vision",
              body: "To be the content and automation partner enterprises trust at every stage — from assessment to migration, from migration to autonomous operations. We want to be known for the outcomes our clients achieve: cleaner data, lower run cost and platforms their own teams can operate.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] border border-white/50 bg-white/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            >
              <div className="h-full rounded-[1.6rem] border border-white/40 bg-card/60 p-8 backdrop-blur-2xl">
                <span className="grid size-14 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground">
                  {item.icon}
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <WaveDivider variant="curve" />

      <Section>
        <SectionHeading
          eyebrow="Our story"
          title="Our digital journey"
          description="From a handful of ECM practitioners to a platform business shipping vendor-neutral migration and autonomous operations tooling."
        />
        <JourneyTimeline items={JOURNEY} />
      </Section>

      <WaveDivider variant="ribbon" />

      <Section className="bg-card/10">
        <SectionHeading
          eyebrow="Our leaders"
          title="Leadership team"
          description="Strategic vision, technical depth and operational discipline across every engagement."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group rounded-[2rem] border border-white/50 bg-white/45 p-2 backdrop-blur-xl shadow-[0_18px_50px_-26px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            >
              <div className="h-full rounded-[1.6rem] border border-white/40 bg-card/60 p-7 text-center backdrop-blur-2xl">
                <span className="font-display mx-auto grid size-20 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-xl font-semibold text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                  {person.initials}
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">{person.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <WaveDivider variant="peaks" />

      <Section>
        <SectionHeading
          eyebrow="Milestones"
          title="Our impact in numbers"
          description="Two decades of delivery across regulated industries, measured the only way that matters."
        />
        <CounterBand items={COUNTERS} />
      </Section>

      <WaveDivider variant="wave" />

      <Section className="bg-card/10">
        <SectionHeading
          eyebrow="Awards & recognition"
          title="Recognised by the industry we serve"
          description="Independent recognition for migration delivery, automation and enablement."
        />
        <AwardsStrip items={AWARDS} />
      </Section>
    </>
  );
}
