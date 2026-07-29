import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/animations/motion-presets";
import { GlassCard } from "@/components/premium/glass-card";
import { PageHeader } from "@/components/premium/page-header";
import { StatusBadge } from "@/components/premium/status-badge";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/premium/states";
import { useProducts } from "@/hooks/use-api";
import { describeError } from "@/hooks/use-auth";
import { titleCase } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/products")({
  head: () => ({
    meta: [
      { title: "Products — Turnpike Analyst Console" },
      {
        name: "description",
        content: "James Webb and Agent P8 product configuration served live from the platform API.",
      },
      { property: "og:title", content: "Products — Turnpike Analyst Console" },
      { property: "og:description", content: "Live product suite configuration." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const query = useProducts();

  return (
    <>
      <PageHeader
        title="Products"
        description="The Turnpike product suite exactly as the public site receives it from /products."
      />

      {query.isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : query.error ? (
        <GlassCard interactive={false}>
          <ErrorState message={describeError(query.error)} onRetry={() => void query.refetch()} />
        </GlassCard>
      ) : !query.data?.length ? (
        <GlassCard interactive={false}>
          <EmptyState title="No products published" />
        </GlassCard>
      ) : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {query.data.map((product) => (
            <StaggerItem key={product._id ?? product.product_code}>
              <GlassCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {titleCase(product.product_code)}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
                  </div>
                  <StatusBadge value={product.is_active ? "ACTIVE" : "INACTIVE"} />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {!!product.key_features?.length && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {product.key_features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!!product.supported_environments?.length && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.supported_environments.map((env) => (
                      <span
                        key={env}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {env}
                      </span>
                    ))}
                  </div>
                )}

                {!!product.pricing_tiers?.length && (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {product.pricing_tiers.map((tier, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-border/50 bg-background/40 p-3 text-xs"
                      >
                        {Object.entries(tier).map(([key, value]) => (
                          <p key={key} className="flex justify-between gap-2">
                            <span className="text-muted-foreground">{titleCase(key)}</span>
                            <span className="font-medium">{String(value)}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <Reveal>
        <p className="text-xs text-muted-foreground">
          Product editing endpoints are not exposed by the API — this view is read-only by design.
        </p>
      </Reveal>
    </>
  );
}
