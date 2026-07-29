import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "@/components/site/parallax";
import { humanise } from "@/components/site/premium-card";
import { Section } from "@/components/site/section";
import { WaveDivider } from "@/components/site/wave-divider";
import { usePublicBlog, usePublicBlogs } from "@/hooks/use-public-api";

export const Route = createFileRoute("/_site/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Insight — Turnpike Analyst field notes" },
      {
        name: "description",
        content:
          "Field notes from live enterprise content migration and automation engagements, published by Turnpike Analyst.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Insight — Turnpike Analyst" },
      {
        property: "og:description",
        content: "Field notes from live migration and automation engagements.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const post = usePublicBlog(slug);
  const all = usePublicBlogs();

  const related = (all.data ?? []).filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Section className="pt-28">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          All insights
        </Link>

        {post.isLoading ? (
          <div className="mt-8 h-64 animate-pulse rounded-[2rem] bg-white/50" />
        ) : post.data ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
                <BookOpen className="size-3.5" />
                {humanise(post.data.category)}
              </span>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {post.data.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                {post.data.author}
                {post.data.published_at
                  ? ` · ${new Date(post.data.published_at).toLocaleDateString()}`
                  : ""}
              </p>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {post.data.summary}
              </p>
            </motion.div>

            <Reveal className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur-xl">
              <div
                className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed [&_p]:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.data.content_html }}
              />
              {post.data.tags?.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Reveal>

            {related.length ? (
              <div className="mx-auto mt-16 max-w-5xl">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Keep reading</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {related.map((item, index) => (
                    <Reveal key={item.slug} delay={index * 0.06}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: item.slug }}
                        className="group block h-full rounded-[1.75rem] border border-white/60 bg-white/55 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                      >
                        <p className="font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.summary}</p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">This article is no longer available.</p>
        )}
      </Section>
      <WaveDivider variant="ribbon" />
    </>
  );
}
