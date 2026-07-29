import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "@/components/site/parallax";
import { Section } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicProducts } from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/products/$slug")({
  head: () => ({
    meta: [
      { title: "Product detail — Turnpike Analyst platform" },
      {
        name: "description",
        content:
          "Capabilities, supported environments and demo options for Turnpike Analyst platform products.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Product detail — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Capabilities and supported environments for this Turnpike Analyst product.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const products = usePublicProducts();
  const product = (products.data ?? []).find(
    (item) => item.product_code.toLowerCase() === slug.toLowerCase(),
  );

  return (
    <>
      <Section className="pt-28">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          All products
        </Link>

        {products.isLoading ? (
          <div className="mt-8 h-64 animate-pulse rounded-[2rem] bg-white/50" />
        ) : product ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
                <Sparkles className="size-3.5" />
                {product.product_code}
              </span>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-primary">{product.tagline}</p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur-xl">
                <h2 className="font-display text-xl font-semibold tracking-tight">Key capabilities</h2>
                <ul className="mt-5 space-y-3">
                  {(product.key_features ?? []).map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </motion.li>
                  ))}
                  {!product.key_features?.length ? (
                    <li className="text-sm text-muted-foreground">Capability sheet publishing soon.</li>
                  ) : null}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur-xl">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Supported environments
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(product.supported_environments ?? []).map((env) => (
                    <span
                      key={env}
                      className="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-sm transition-transform duration-300 hover:-translate-y-1 hover:text-primary"
                    >
                      {env}
                    </span>
                  ))}
                  {!product.supported_environments?.length ? (
                    <p className="text-sm text-muted-foreground">Deploys on cloud, hybrid and on-prem.</p>
                  ) : null}
                </div>

                <Link
                  to="/contact"
                  className="mt-8 flex items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--primary),var(--brand-cyan))] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-105"
                >
                  Request a demo
                </Link>
              </Reveal>
            </div>
          </>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">This product is not available.</p>
        )}
      </Section>
      <WaveDivider variant="layered" />
    </>
  );
}
