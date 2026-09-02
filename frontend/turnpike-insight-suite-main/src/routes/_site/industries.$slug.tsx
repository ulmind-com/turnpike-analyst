import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePublicIndustry } from "@/hooks/use-public-api";
import { getIndustryDynamicData } from "@/content/industries-dynamic-data";

export const Route = createFileRoute("/_site/industries/$slug")({
  head: () => ({
    meta: [
      { title: "Industry Solutions — Turnpike Analyst" },
    ],
  }),
  component: IndustryDetailPage,
});

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.Briefcase;
  return <IconComponent className={className} />;
};

function IndustryDetailPage() {
  const { slug } = Route.useParams();
  const industry = usePublicIndustry(slug);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (industry.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse h-16 w-16 rounded-full bg-primary/20" />
      </div>
    );
  }

  const title = industry.data?.title || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Pull our new dynamic structured data based on the slug
  const dynamicData = getIndustryDynamicData(slug, title);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-slate-100">
        <div className="relative mx-auto max-w-[1400px]">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <LucideIcons.ChevronRight className="h-4 w-4" />
            <Link to="/industries" className="hover:text-primary transition-colors">Industries</Link>
            <LucideIcons.ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">{title}</span>
          </div>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-8">
                <LucideIcons.Briefcase className="w-4 h-4" />
                <span>Industry Expertise: {title}</span>
              </div>
              <h1 className="text-5xl lg:text-[4rem] font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
                {dynamicData.heroHeadline}
              </h1>
              <p className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
                {dynamicData.heroSubheadline}
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20">
                Schedule a Free Consultation
                <LucideIcons.ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            {/* Right: illustration */}
            <div className="flex items-center justify-center">
              <img
                src={dynamicData.heroImage}
                alt={`${title} illustration`}
                className="w-full max-w-[480px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRENDS SECTION (What's Reshaping The Industry) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              What's Reshaping <span className="text-primary">{title}</span> Right Now?
            </h2>
            <p className="text-xl text-slate-600">
              The landscape is shifting faster than ever. Here is what leading organizations are focusing on to stay ahead.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {dynamicData.trends.map((trend, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-10 border border-slate-100 hover:border-primary/30 transition-all hover:shadow-lg group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <DynamicIcon name={trend.icon} className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{trend.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{trend.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION (The Hard Problems) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              The Hard Problems You Face
            </h2>
            <p className="text-xl text-slate-400">
              We don't just write code. We solve the specific operational and technical bottlenecks choking your growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {dynamicData.problems.map((prob, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700 hover:bg-slate-800 transition-colors">
                <DynamicIcon name={prob.icon} className="w-10 h-10 text-rose-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{prob.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{prob.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Purpose-built technology designed to overcome your industry's specific hurdles and unlock massive scale.
            </p>
          </div>
          <div className="space-y-16">
            {dynamicData.solutions.map((sol, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-primary/10 via-slate-100 to-slate-50 flex items-center justify-center border border-slate-200">
                      <DynamicIcon name={sol.icon} className="w-28 h-28 text-primary/40" />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 lg:px-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-8">
                      <DynamicIcon name={sol.icon} className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                      {sol.title}
                    </h3>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                      {sol.description}
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all text-lg">
                      Explore this solution <LucideIcons.ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE / GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-[1400px] text-center">
          <h3 className="text-lg font-bold uppercase tracking-widest text-slate-500 mb-12">
            Technologies Powering {title}
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {dynamicData.techStack.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <DynamicIcon name={tech.icon} className="w-8 h-8 text-slate-800" />
                <span className="text-xl font-bold text-slate-800">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Turnpike?
              </h2>
              <p className="text-xl text-slate-600 mb-10">
                We combine deep technical expertise with specialized industry knowledge to deliver solutions that actually impact your bottom line.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800">
                Talk to an Expert
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {dynamicData.whyUs.map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                  <DynamicIcon name={item.icon} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {dynamicData.faqs.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-[800px]">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {dynamicData.faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-lg pr-8">{faq.question}</span>
                    <LucideIcons.ChevronDown className={`h-6 w-6 text-slate-400 transition-transform flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 overflow-hidden"
                      >
                        <p className="pb-6 text-slate-600 font-medium leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
