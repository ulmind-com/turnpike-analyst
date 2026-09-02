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
  CAPABILITIES,
  DEPARTMENTS,
  HERO_CLAIMS,
  TECH_STACK,
  WHY_CHOOSE,
} from "@/content/site-content";

import {
  usePublicBlogs,
  usePublicCourses,
  usePublicServices,
  useBookCall,
  usePublicTestimonials,
  usePublicAwards,
} from "@/hooks/use-public-api";

import { BookCallDialog } from "@/components/shared/book-call-dialog";
import { useConsultants, Consultant } from "@/api/services/consultants.api";

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
  const courses = usePublicCourses();
  const blogs = usePublicBlogs();
  const testimonialsQuery = usePublicTestimonials();
  const awardsQuery = usePublicAwards();
  const { data: consultants } = useConsultants(true);
  const navigate = useNavigate();

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | undefined>();

  const handleBook = (c: Consultant) => {
    setSelectedConsultant(c);
    setBookModalOpen(true);
  };


  return (
    <>
      <HeroAJ />

      <PlatformStats 
        serviceCount={services.data?.length ?? 16} 
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

      <Section id="industries" className="bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-none bg-[size:4rem_4rem]">
        <SectionHeading
          eyebrow="Industries we serve"
          title={<>Which Industry Are You <HighlightWord word="Building" /> For?</>}
          description="We don't just build software — we understand the business context it operates in. From healthcare compliance to fintech security to logistics automation, our teams bring sector-specific thinking to every project."
        />
        <IndustryGrid className="mt-12" />
      </Section>

      <WaveDivider variant="curve" />

      <Section id="consultants" className="py-16 lg:py-24">
        {consultants?.map((consultant) => (
          <div key={consultant._id} className="mx-auto max-w-4xl mt-8 rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-md transition-all hover:bg-white/10 hover:border-primary/50">
            <div className="relative size-32 shrink-0 rounded-full overflow-hidden border-2 border-primary/30 group">
              <img src={consultant.avatar_url} alt={consultant.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{consultant.name}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {consultant.role_description}
              </p>
              <Button className="mt-4" onClick={() => handleBook(consultant)}>Contact Me To Book Your Slot</Button>
            </div>
          </div>
        ))}
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
          <AwardsStrip items={awardsQuery.data ?? []} />
        </div>
      </Section>

      <WaveDivider variant="peaks" />

      <Section id="reviews">
        <SectionHeading
          eyebrow="Read more reviews"
          title="Driving technology for leading brands"
          description="Programme leaders describe what changed after the migration completed."
        />
        <TestimonialCarousel items={testimonialsQuery.data ?? []} />
      </Section>


      <WaveDivider variant="ribbon" />

      <section id="insights">
        <OnboardingBlogCards blogs={blogs.data ?? []} loading={blogs.isLoading} />
      </section>

      <BookCallDialog 
        open={bookModalOpen} 
        onOpenChange={setBookModalOpen} 
        consultant={selectedConsultant} 
      />

    </>
  );
}



function PlatformStats({
  serviceCount,
  courseCount,
}: {
  serviceCount: number;
  courseCount: number;
}) {
  return (
    <section className="relative px-5 pt-14 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollZoom from={0.96} to={1.04}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Service capabilities", value: serviceCount },
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


