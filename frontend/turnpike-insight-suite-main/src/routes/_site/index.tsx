import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, Bot, GraduationCap, Rocket, Sparkles, Star, Award, FileCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { CountUp } from "@/components/premium/count-up";
import { GlassCard } from "@/components/premium/glass-card";
import { AnimatedStatBand } from "@/components/site/animated-stat-band";
import { ServicesExplorer } from "@/components/site/services-explorer";
import { AwardsStrip } from "@/components/site/awards-strip";

import { CapabilityGrid } from "@/components/site/capability-grid";
import { FeatureSpotlight } from "@/components/site/feature-spotlight";
import { HeroAJ } from "@/components/site/hero-aj";
import { IndustryGrid } from "@/components/site/industry-grid";

import { TechStackExplorer } from "@/components/site/tech-stack-explorer";
import { Reveal, ScrollZoom } from "@/components/site/parallax";
import {
  PremiumCard,
  PremiumCardSkeleton,
  ServiceCard,
  humanise,
} from "@/components/site/premium-card";
import { DarkFeatureSpotlight } from "@/components/site/dark-feature-spotlight";
import { RotatingClaims } from "@/components/site/rotating-claims";
import { HighlightWord, Section, SectionHeading } from "@/components/site/section";
import { ConnectedStatBand, StatBand } from "@/components/site/stat-band";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { WaveDivider } from "@/components/site/wave-divider";
import { WhyChoose } from "@/components/site/why-choose";
import { OnboardingBlogCards } from "@/components/site/onboarding-blog-cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AWARDS,
  CAPABILITIES,
  COUNTERS,
  DEPARTMENTS,
  FLAGSHIPS,
  HERO_CLAIMS,
  TECH_STACK,
  TESTIMONIALS,
  WHY_CHOOSE,
} from "@/content/site-content";

import {
  usePublicBlogs,
  usePublicCourses,
  usePublicProducts,
  usePublicServices,
  useBookCall,
} from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Turnpike Analyst — Enterprise Content & Automation Partner" },
      {
        name: "description",
        content:
          "Enterprise content migration, intelligent automation, and practitioner-led training for regulated organisations. Explore services, products and the academy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Turnpike Analyst — Enterprise Content & Automation Partner" },
      {
        property: "og:description",
        content:
          "ECM migration, automation and training delivered by practitioners. Book a discovery call with Turnpike Analyst.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });

function HomePage() {
  const services = usePublicServices();
  const products = usePublicProducts();
  const courses = usePublicCourses();
  const blogs = usePublicBlogs();
  const navigate = useNavigate();

  return (
    <>
      <HeroAJ />

      <PlatformStats 
        serviceCount={services.data?.length ?? 16} 
        productCount={products.data?.length ?? 2} 
        courseCount={courses.data?.length ?? 4} 
      />

      <Section id="platforms" className="bg-card/10 py-16 lg:py-20">
        <SectionHeading
          eyebrow="Ecosystem"
          title={<>Our clients include 150 global brands and <HighlightWord word="Silicon Valley" /> founders</>}
          description="Every major ECM, integration and cloud platform we migrate, integrate and operate."
        />
        <TechStackExplorer stack={TECH_STACK} />
      </Section>

      <WaveDivider variant="layered" />

      <Section id="services" className="bg-[#0b0c10] text-white">
        <ServicesExplorer services={services.data ?? []} loading={services.isLoading} />
      </Section>


      <WaveDivider variant="wave" />

      <Section id="industries" className="bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <SectionHeading
          eyebrow="Industries we serve"
          title={<>Which Industry Are You <HighlightWord word="Building" /> For?</>}
          description="We don't just build software — we understand the business context it operates in. From healthcare compliance to fintech security to logistics automation, our teams bring sector-specific thinking to every project."
        />
        <IndustryGrid className="mt-12" />
      </Section>

      <WaveDivider variant="curve" />

      <Section id="agent-p8" className="py-16 lg:py-24">
        <DarkFeatureSpotlight
          eyebrow={FLAGSHIPS[0].eyebrow}
          title={FLAGSHIPS[0].title}
          body={FLAGSHIPS[0].body}
          bullets={FLAGSHIPS[0].bullets}
        />
      </Section>

      <WaveDivider variant="curve" />

      <Section id="james-webb" className="py-16 lg:py-24">
        <DarkFeatureSpotlight
          eyebrow={FLAGSHIPS[1].eyebrow}
          title={FLAGSHIPS[1].title}
          body={FLAGSHIPS[1].body}
          bullets={FLAGSHIPS[1].bullets}
        />

        <div className="mx-auto max-w-4xl mt-16 rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-md">
          <div className="relative size-32 shrink-0 rounded-full overflow-hidden border-2 border-primary/30">
            <img src="https://ui-avatars.com/api/?name=James+Webb&background=10b981&color=fff&size=256" alt="James Webb" className="object-cover w-full h-full" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Hi, I'm James Webb</h3>
            <p className="text-slate-600 leading-relaxed">
              I am your human interface media to interact with TurnPikeAnalyst. With over 20 years of experience in enterprise content management and automation, I'm here to ensure your migration is seamless and your new platforms operate flawlessly.
            </p>
            <Button className="mt-4" onClick={scrollToContact}>Contact Me To Book Your Slot</Button>
          </div>
        </div>
      </Section>



      <WaveDivider variant="ribbon" />

      <Section id="why-us">
        <WhyChoose items={WHY_CHOOSE} onCta={scrollToContact} />
      </Section>



      <WaveDivider variant="peaks" />
      
      <Section id="awards" className="py-16">
        <SectionHeading
          eyebrow="Excellence"
          title="Recent Awards & Certifications"
          description="Recognised by industry leaders for our commitment to quality, security, and innovation."
        />
        <div className="mt-12">
          <AwardsStrip items={AWARDS} />
        </div>
      </Section>

      <WaveDivider variant="peaks" />

      <Section id="reviews">
        <SectionHeading
          eyebrow="Read more reviews"
          title="Driving technology for leading brands"
          description="Programme leaders describe what changed after the migration completed."
        />
        <TestimonialCarousel items={TESTIMONIALS} />
      </Section>


      <WaveDivider variant="ribbon" />

      <section id="insights">
        <OnboardingBlogCards blogs={blogs.data ?? []} loading={blogs.isLoading} />
      </section>

    </>
  );
}

function SpotlightVisual({ kind }: { kind: "agent" | "webb" }) {
  const rows =
    kind === "agent"
      ? ["CPE", "ICN", "BAW", "BAI", "RPA", "LDAP"]
      : ["FileNet", "OpenText", "SharePoint", "Documentum", "OnBase", "Box"];

  const Icon = kind === "agent" ? Bot : Rocket;

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {kind === "agent" ? "Live estate" : "Source connectors"}
          </p>
          <p className="font-display text-lg font-semibold tracking-tight">
            {kind === "agent" ? "All components healthy" : "Any platform, any target"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {rows.map((row, index) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group/row relative flex cursor-default items-center justify-between overflow-hidden rounded-xl border border-white/50 bg-white/50 px-4 py-3 text-sm backdrop-blur transition-colors duration-300 hover:border-primary/40"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 origin-left scale-x-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-x-100 group-hover/row:opacity-100"
              style={{
                background:
                  "linear-gradient(100deg, color-mix(in oklab, var(--primary) 16%, white), color-mix(in oklab, var(--brand-cyan) 18%, white))",
              }}
            />
            <span className="relative truncate font-medium transition-colors group-hover/row:text-primary">
              {row}
            </span>
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
              className="relative size-2 rounded-full bg-primary"
            />
          </motion.div>
        ))}
      </div>


      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/50">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "94%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--brand-cyan))]"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {kind === "agent" ? "Automated remediation coverage" : "Metadata fidelity on last migration"}
      </p>
    </div>
  );
}

function PlatformStats({
  serviceCount,
  productCount,
  courseCount,
}: {
  serviceCount: number;
  productCount: number;
  courseCount: number;
}) {
  return (
    <section className="relative px-5 pt-14 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollZoom from={0.96} to={1.04}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Service capabilities", value: serviceCount },
              { label: "Platform products", value: productCount },
              { label: "Academy courses", value: courseCount },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="rounded-[2rem] border border-white/50 bg-white/45 p-2 shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)] backdrop-blur-xl"
              >
                <div className="rounded-[1.6rem] border border-white/40 bg-card/60 p-7 text-center backdrop-blur-2xl">
                  <p className="font-display text-4xl font-semibold tracking-tight text-primary">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollZoom>
      </div>
    </section>
  );
}


