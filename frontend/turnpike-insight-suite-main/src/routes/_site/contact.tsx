import { createFileRoute } from "@tanstack/react-router";
import { Headset, Mail, MapPin, PhoneCall } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/site/parallax";
import { Section, SectionHeading } from "@/components/site/section";
import { StatBand } from "@/components/site/stat-band";
import { WaveDivider } from "@/components/site/wave-divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_PHONE, DEPARTMENTS, IMPACT_STATS } from "@/content/site-content";
import { useBookCall, useSubmitNeeds } from "@/hooks/use-public-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact Turnpike Analyst — Book a Consultation" },
      {
        name: "description",
        content:
          "Reach the Turnpike Analyst technical team, management team or help desk. Book a discovery call or submit your ECM migration requirements.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Contact Turnpike Analyst — Book a Consultation" },
      {
        property: "og:description",
        content:
          "Tell us about your content estate. Our consultants reply within eight hours or less.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type Mode = "BOOK_CALL" | "SUBMIT_NEEDS";

function ContactPage() {
  const bookCall = useBookCall();
  const submitNeeds = useSubmitNeeds();

  const [mode, setMode] = useState<Mode>("BOOK_CALL");
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0].value);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const pending = bookCall.isPending || submitNeeds.isPending;

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.full_name) newErrors.full_name = "Please fill out this field.";
    if (!form.email) newErrors.email = "Please fill out this field.";
    if (!form.phone) newErrors.phone = "Please fill out this field.";
    if (!form.company) newErrors.company = "Please fill out this field.";
    if (!form.subject) newErrors.subject = "Please fill out this field.";
    if (!form.message) newErrors.message = "Please fill out this field.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    
    const payload = { ...form, type: mode, department };
    const mutation = mode === "BOOK_CALL" ? bookCall : submitNeeds;

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Received. Our consultants reply within eight hours or less.");
        setForm({ full_name: "", email: "", phone: "", company: "", subject: "", message: "" });
        setErrors({});
      },
      onError: () => toast.error("Could not submit right now. Please try again."),
    });
  };

  const field = (key: keyof typeof form) => ({
    id: key,
    value: form[key],
    onChange: (event: { target: { value: string } }) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    // Remove the native 'required' attribute so we can use our custom UI validation
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Grip-style Hero Section */}
      <section className="relative w-full pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden flex items-center justify-center">
        {/* Background Image - Education/Tech themed like reference */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop" alt="Team collaborating" className="w-full h-full object-cover opacity-80" />
        </div>
        {/* Gradient Overlay matching 'Grip' design (green to blue) */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] mix-blend-multiply opacity-90" />
        
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md mb-8">
              Contact Us
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl text-balance max-w-4xl drop-shadow-sm">
              Let's build something great together.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white max-w-2xl mx-auto drop-shadow-sm font-medium">
              Ready to unlock the full potential of your content estate? Tell us what you are trying to solve and we will come back with a scoped technical point of view — not a brochure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16 lg:pb-24 relative z-30 -mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          
          {/* Left Column: Contact Info & Departments */}
          <div className="flex flex-col">
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Who do you need to reach?</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {DEPARTMENTS.map((team, index) => (
                  <motion.button
                    key={team.value}
                    type="button"
                    onClick={() => setDepartment(team.value)}
                    onMouseEnter={() => setDepartment(team.value)}
                    onFocus={() => setDepartment(team.value)}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "rounded-3xl border p-6 text-left transition-all duration-300 bg-white shadow-sm",
                      department === team.value
                        ? "border-primary shadow-md scale-[1.02]"
                        : "border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex size-10 shrink-0 place-items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Headset className="size-4" />
                      </span>
                      <h4 className="font-display text-base font-semibold tracking-tight text-slate-900">{team.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500">{team.body}</p>
                  </motion.button>
                ))}
              </div>
            </div>


            <div className="mt-8 bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-slate-100 space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Direct contact</h3>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm transition-all hover:-translate-y-1 hover:text-primary hover:border-primary/30"
              >
                <div className="grid size-8 place-items-center rounded-full bg-primary/10">
                  <PhoneCall className="size-4 text-primary" />
                </div>
                <span className="font-medium text-slate-900">{CONTACT_PHONE}</span>
              </a>
              <a
                href="mailto:info@turnpikeanalyst.com"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm transition-all hover:-translate-y-1 hover:text-primary hover:border-primary/30"
              >
                <div className="grid size-8 place-items-center rounded-full bg-primary/10">
                  <Mail className="size-4 text-primary" />
                </div>
                <span className="font-medium text-slate-900">info@turnpikeanalyst.com</span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10">
                  <MapPin className="size-4 text-primary" />
                </div>
                <span className="font-medium text-slate-900">Global delivery — on-premises, cloud and hybrid engagements</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.1}>
            <motion.div
              className="rounded-[2.5rem] border border-slate-100 bg-white p-8 sm:p-12 shadow-2xl sticky top-24"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Send us a message</h3>
              
              <div className="mb-8 flex justify-center">
                  <div className="inline-flex rounded-full border border-white/60 bg-white/50 p-1.5 shadow-sm">
                    {(
                      [
                        { value: "BOOK_CALL", label: "Book a call" },
                        { value: "SUBMIT_NEEDS", label: "Submit needs" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setMode(option.value)}
                        className={cn(
                          "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300",
                          mode === option.value
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-primary",
                        )}
                      >
                        {mode === option.value ? (
                          <motion.span
                            layoutId="contact-mode-pill"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            className="absolute inset-0 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] shadow-md"
                          />
                        ) : null}
                        <span className="relative z-10">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" noValidate>
                  <AnimatedField index={0} label="Your name" htmlFor="full_name" error={errors.full_name}>
                    <Input placeholder="Jane Doe" {...field("full_name")} className={errors.full_name ? "border-red-500/50 focus-visible:ring-red-500/50" : ""} />
                  </AnimatedField>
                  <AnimatedField index={1} label="Your email" htmlFor="email" error={errors.email}>
                    <Input type="email" placeholder="jane@company.com" {...field("email")} className={errors.email ? "border-red-500/50 focus-visible:ring-red-500/50" : ""} />
                  </AnimatedField>
                  <AnimatedField index={2} label="Mobile number" htmlFor="phone" error={errors.phone}>
                    <Input placeholder="+1 555 0100" {...field("phone")} className={errors.phone ? "border-red-500/50 focus-visible:ring-red-500/50" : ""} />
                  </AnimatedField>
                  <AnimatedField index={3} label="Company" htmlFor="company" error={errors.company}>
                    <Input placeholder="Acme Corp" {...field("company")} className={errors.company ? "border-red-500/50 focus-visible:ring-red-500/50" : ""} />
                  </AnimatedField>
                  <AnimatedField index={4} label="Subject" htmlFor="subject" wide error={errors.subject}>
                    <Input placeholder="FileNet to cloud migration" {...field("subject")} className={errors.subject ? "border-red-500/50 focus-visible:ring-red-500/50" : ""} />
                  </AnimatedField>
                  <AnimatedField index={5} label="Your message" htmlFor="message" wide error={errors.message}>
                    <Textarea
                      rows={4}
                      placeholder="Current platform, volumes, timelines…"
                      {...field("message")}
                      className={errors.message ? "border-red-500/50 focus-visible:ring-red-500/50" : ""}
                    />
                  </AnimatedField>
                  <motion.div
                    className="sm:col-span-2 mt-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" size="lg" disabled={pending} className="group/cta relative overflow-hidden w-full h-14 text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-primary/30">
                      <span aria-hidden className="sheen" />
                      <span className="relative">
                        {pending ? "Submitting…" : mode === "BOOK_CALL" ? "Request discovery call" : "Send requirements"}
                      </span>
                    </Button>
                  </motion.div>
                </form>
            </motion.div>
          </Reveal>
        </div>
      </div>

      <WaveDivider variant="ribbon" />

      <Section className="bg-slate-50 pt-0">
        <Reveal>
          <StatBand items={IMPACT_STATS} />
        </Reveal>
      </Section>
    </div>
  );
}

function AnimatedField({
  index,
  label,
  htmlFor,
  error,
  wide = false,
  children,
}: {
  index: number;
  label: string;
  htmlFor: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group/field flex flex-col gap-2 rounded-2xl transition-transform duration-300 focus-within:-translate-y-1 relative",
        wide && "sm:col-span-2",
      )}
    >
      <Label
        htmlFor={htmlFor}
        className={cn(
          "transition-colors duration-300 font-medium",
          error ? "text-red-500" : "group-focus-within/field:text-primary text-foreground"
        )}
      >
        {label}
      </Label>
      <div className={cn(
        "rounded-xl transition-shadow duration-300",
        error ? "shadow-[0_0_0_2px_rgba(239,68,68,0.3)]" : "focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
      )}>
        {children}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-red-500 text-xs font-semibold"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
