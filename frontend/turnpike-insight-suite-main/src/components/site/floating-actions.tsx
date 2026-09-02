import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/** Floating scroll-to-top control plus a persistent "talk to us" shortcut. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {visible ? (
          <motion.button
            key="top"
            type="button"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid size-11 place-items-center rounded-full border border-border/60 bg-background/70 text-primary backdrop-blur-xl shadow-[0_16px_36px_-20px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        href="/contact"
        whileHover={{ y: -3 }}
        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--primary)_75%,transparent)]"
      >
        <MessageCircle className="size-4" />
        <span className="hidden sm:inline">Talk to us</span>
      </motion.a>
    </div>
  );
}
