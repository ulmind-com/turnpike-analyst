import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TurnpikeLogo } from "@/components/site/turnpike-logo";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Academy", to: "/training" },
  { label: "Insights", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader({ revealOnScroll = false }: { revealOnScroll?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  const hidden = revealOnScroll && !scrolled;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="pointer-events-none sticky top-0 z-50 w-full px-3 py-3 sm:px-6 sm:py-5"
    >
      <div
        className={`pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/60 bg-white/70 px-3 py-2 backdrop-blur-xl transition-shadow duration-500 sm:px-4 ${
          scrolled
            ? "shadow-[0_26px_60px_-30px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
            : "shadow-[0_14px_40px_-32px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
        }`}
      >
        <Link to="/" className="group flex shrink-0 items-center pl-1">
          <TurnpikeLogo dark={false} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))]"
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="group hidden items-center gap-2 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-105 sm:inline-flex"
          >
            Book a call
            <span className="grid size-8 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:rotate-45">
              <ArrowRight className="size-4" />
            </span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-white/60 bg-white/60 text-foreground transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 p-3 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.3 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
                    isActive(link.to)
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ArrowRight className="size-4 opacity-60" />
                </Link>
              </motion.div>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Book a discovery call
              <ArrowRight className="size-4" />
            </Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
