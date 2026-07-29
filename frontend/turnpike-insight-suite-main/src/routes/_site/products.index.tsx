import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/site/parallax";
import { PremiumCard, PremiumCardSkeleton } from "@/components/site/premium-card";
import { Section, SectionHeading } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicProducts } from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/products/")({
  head: () => ({
    meta: [
      { title: "Products — JAMES WEBB & Agent P8 by Turnpike Analyst" },
      {
        name: "description",
        content:
          "Platform products engineered for migration fidelity and autonomous operations in regulated environments. Request a live demo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Products — Turnpike Analyst" },
      {
        property: "og:description",
        content: "JAMES WEBB and Agent P8 — enterprise-grade migration and automation products.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const products = usePublicProducts();

  return (
    <>
      <Section className="pt-28">
        <SectionHeading
          eyebrow="Products"
          title="Platform products built for regulated scale"
          description="Engineered in-house, hardened on live enterprise estates."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {(products.data ?? []).map((product, index) => (
            <Reveal key={product.product_code} delay={index * 0.07}>
              <PremiumCard
                accent="cyan"
                bookmarkable
                icon={<Sparkles className="size-5" />}
                title={product.name}
                description={product.description}
                meta={[
                  { label: "Product", value: product.product_code },
                  { label: "Capabilities", value: String(product.key_features?.length ?? 0) },
                  { label: "Status", value: product.is_active === false ? "Preview" : "Available" },
                ]}
              >
                <p className="mt-3 text-sm font-medium text-primary">{product.tagline}</p>
                {product.key_features?.length ? (
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {product.key_features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
                >
                  Request demo
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
          {products.isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <PremiumCardSkeleton key={index} className="h-[24rem]" />
              ))
            : null}
        </div>
      </Section>
      <WaveDivider variant="curve" />
    </>
  );
}
