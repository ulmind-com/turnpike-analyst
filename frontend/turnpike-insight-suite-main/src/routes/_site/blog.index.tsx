import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { Reveal } from "@/components/site/parallax";
import { PremiumCard, PremiumCardSkeleton, humanise } from "@/components/site/premium-card";
import { Section, SectionHeading } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicBlogs } from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Field Notes from Turnpike Analyst Engagements" },
      {
        name: "description",
        content:
          "Editorial and field notes on ECM migration, intelligent automation and regulated content operations from Turnpike Analyst consultants.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Insights — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Practitioner writing on migration fidelity, automation and content governance.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const blogs = usePublicBlogs();

  return (
    <>
      <Section className="pt-28">
        <SectionHeading
          eyebrow="Insights"
          title="Field notes from live engagements"
          description="Written by the consultants doing the work, not a content team."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(blogs.data ?? []).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <PremiumCard
                accent="cyan"
                bookmarkable
                icon={<BookOpen className="size-5" />}
                title={post.title}
                description={post.summary}
                meta={[
                  { label: "Author", value: post.author },
                  {
                    label: "Published",
                    value: post.published_at
                      ? new Date(post.published_at).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—",
                  },
                  { label: "Category", value: humanise(post.category) },
                ]}
              >
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105"
                >
                  Read more
                </Link>

              </PremiumCard>
            </Reveal>
          ))}
          {blogs.isLoading
            ? Array.from({ length: 6 }).map((_, index) => <PremiumCardSkeleton key={index} />)
            : null}
          {!blogs.isLoading && (blogs.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">Insights are publishing soon.</p>
          ) : null}
        </div>
      </Section>
      <WaveDivider variant="ribbon" />
    </>
  );
}
