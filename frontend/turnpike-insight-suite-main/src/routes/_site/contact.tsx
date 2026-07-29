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

  const pending = bookCall.isPending || submitNeeds.isPending;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form, type: mode, department };
    const mutation = mode === "BOOK_CALL" ? bookCall : submitNeeds;

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Received. Our consultants reply within eight hours or less.");
        setForm({ full_name: "", email: "", phone: "", company: "", subject: "", message: "" });
      },
      onError: () => toast.error("Could not submit right now. Please try again."),
    });
  };

  const field = (key: keyof typeof form) => ({
    id: key,
    value: form[key],
    onChange: (event: { target: { value: string } }) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value })),
  });

  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Contact"
          title="Contact us to book your slot"
          description="Ready to unlock the full potential of your content estate? Tell us what you are trying to solve and we come back with a scoped point of view — not a brochure."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {DEPARTMENTS.map((team, index) => (
            <motion.button
              key={team.value}
              type="button"
              onClick={() => setDepartment(team.value)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={cn(
                "rounded-[2rem] border p-2 text-left backdrop-blur-xl transition-colors",
                department === team.value
                  ? "border-primary/50 bg-white/60"
                  : "border-white/50 bg-white/45",
              )}
            >
              <div className="h-full rounded-[1.6rem] border border-white/40 bg-card/60 p-7 backdrop-blur-2xl">
                <span className="grid size-12 place-items-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] text-primary-foreground">
                  <Headset className="size-5" />
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">{team.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{team.body}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      <WaveDivider variant="layered" />

      <Section className="bg-card/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              What can we help you with?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our consultants will reply within eight hours or less. Share your platform, volumes and
              timelines and we will map the fastest safe route forward.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/45 px-5 py-4 text-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:text-primary"
              >
                <PhoneCall className="size-4 text-primary" />
                {CONTACT_PHONE}
              </a>
              <a
                href="mailto:info@turnpikeanalyst.com"
                className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/45 px-5 py-4 text-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                info@turnpikeanalyst.com
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/45 px-5 py-4 text-sm backdrop-blur-xl">
                <MapPin className="size-4 text-primary" />
                Global delivery — on-premises, cloud and hybrid engagements
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/45 p-2 backdrop-blur-xl shadow-[0_22px_60px_-28px_color-mix(in_oklab,var(--primary)_50%,transparent)] transition-shadow duration-500 hover:shadow-[0_34px_80px_-26px_color-mix(in_oklab,var(--primary)_68%,transparent)]"
            >
              <span aria-hidden className="sheen" />
              <div className="relative rounded-[1.6rem] border border-white/40 bg-card/60 p-7 backdrop-blur-2xl sm:p-9">
                <div className="mb-6 inline-flex rounded-full border border-white/60 bg-white/50 p-1">
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
                        "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                        mode === option.value
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      {mode === option.value ? (
                        <motion.span
                          layoutId="contact-mode-pill"
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                        />
                      ) : null}
                      <span className="relative">{option.label}</span>
                    </button>
                  ))}
                </div>

                <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                  <AnimatedField index={0} label="Your name" htmlFor="full_name">
                    <Input required placeholder="Jane Doe" {...field("full_name")} />
                  </AnimatedField>
                  <AnimatedField index={1} label="Your email" htmlFor="email">
                    <Input required type="email" placeholder="jane@company.com" {...field("email")} />
                  </AnimatedField>
                  <AnimatedField index={2} label="Mobile number" htmlFor="phone">
                    <Input required placeholder="+1 555 0100" {...field("phone")} />
                  </AnimatedField>
                  <AnimatedField index={3} label="Company" htmlFor="company">
                    <Input required placeholder="Acme Corp" {...field("company")} />
                  </AnimatedField>
                  <AnimatedField index={4} label="Subject" htmlFor="subject" wide>
                    <Input required placeholder="FileNet to cloud migration" {...field("subject")} />
                  </AnimatedField>
                  <AnimatedField index={5} label="Your message" htmlFor="message" wide>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Current platform, volumes, timelines…"
                      {...field("message")}
                    />
                  </AnimatedField>
                  <motion.div
                    className="sm:col-span-2"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button type="submit" size="lg" disabled={pending} className="group/cta relative overflow-hidden">
                      <span aria-hidden className="sheen" />
                      <span className="relative">
                        {pending ? "Submitting…" : mode === "BOOK_CALL" ? "Request discovery call" : "Send requirements"}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

          </Reveal>
        </div>
      </Section>

      <WaveDivider variant="ribbon" />

      <Section>
        <Reveal>
          <StatBand items={IMPACT_STATS} />
        </Reveal>
      </Section>
    </>
  );
}

function AnimatedField({
  index,
  label,
  htmlFor,
  wide = false,
  children,
}: {
  index: number;
  label: string;
  htmlFor: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group/field space-y-2 rounded-2xl transition-transform duration-300 focus-within:-translate-y-0.5",
        wide && "sm:col-span-2",
      )}
    >
      <Label
        htmlFor={htmlFor}
        className="transition-colors duration-300 group-focus-within/field:text-primary"
      >
        {label}
      </Label>
      <div className="rounded-xl transition-shadow duration-300 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)]">
        {children}
      </div>
    </motion.div>
  );
}
