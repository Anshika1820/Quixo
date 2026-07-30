import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, TrendingUp, HelpCircle, ArrowUpRight, Copy, Share2 } from "lucide-react";
import { Logo } from "@/components/quixo/Logo";
import { SearchBar } from "@/components/quixo/SearchBar";
import { Footer } from "@/components/quixo/Footer";
import {
  categories,
  sources,
  webResults,
  imageResults,
  relatedQuestions,
  trending,
} from "@/components/quixo/data";

const title = "Quixo Search Results — grounded answers with sources";
const description =
  "See the Quixo results experience: an AI answer card with cited sources, web results, image results, and related questions.";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "how do AI answer engines work",
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Favicon({ letter }: { letter: string }) {
  return (
    <span
      className="grid size-7 shrink-0 place-items-center rounded-lg border border-border text-[11px] font-semibold"
      style={{ backgroundImage: "var(--gradient-crimson)" }}
    >
      {letter}
    </span>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

function SearchPage() {
  const { q } = Route.useSearch();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("AI");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-3">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
            <Logo compact />
            <SearchBar key={q} initialValue={q} compact />
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300"
                style={{
                  backgroundColor:
                    tab === c ? "color-mix(in oklab, var(--primary) 16%, transparent)" : "transparent",
                  color: tab === c ? "var(--accent-glow)" : "var(--muted-foreground)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          {/* AI answer */}
          <section className="surface-card relative overflow-hidden p-5 sm:p-6">
            <div className="halo pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-primary uppercase">
                <Sparkles className="size-3.5" />
                Quixo answer
              </div>
              <h1 className="mt-3 text-xl leading-snug font-semibold sm:text-2xl">{q}</h1>

              {loading ? (
                <div className="mt-5 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-9/12" />
                  <Skeleton className="h-4 w-10/12" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/85"
                >
                  <p>
                    An answer engine first retrieves a small set of highly relevant passages,
                    then asks a language model to compose a response grounded strictly in
                    those passages. The links you see are evidence for each claim rather than
                    destinations to sift through.
                  </p>
                  <p>
                    Quality comes from the retrieval stage: hybrid lexical and dense search
                    catches both exact terms and intent, reranking trims noise, and citations
                    keep the model honest.
                  </p>
                </motion.div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-9 w-40 rounded-xl" />
                    ))
                  : sources.map((s, i) => (
                      <motion.a
                        key={s.name}
                        href="#"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 * i, ease }}
                        whileHover={{ y: -2 }}
                        className="flex max-w-[240px] items-center gap-2 rounded-xl border border-border bg-surface px-2.5 py-2 transition-colors duration-300 hover:border-primary/50"
                      >
                        <Favicon letter={s.letter} />
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-medium">{s.title}</span>
                          <span className="block truncate text-[11px] text-muted-foreground">
                            {s.name}
                          </span>
                        </span>
                      </motion.a>
                    ))}
              </div>

              <div className="mt-5 flex gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-primary">
                  <Copy className="size-3.5" /> Copy
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-primary">
                  <Share2 className="size-3.5" /> Share
                </button>
              </div>
            </div>
          </section>

          {/* Web results */}
          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase">Web results</h2>
            <div className="space-y-3">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="surface-card space-y-3 p-4">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                  ))
                : webResults.map((r, i) => (
                    <motion.a
                      key={r.title}
                      href="#"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease }}
                      whileHover={{ y: -3 }}
                      className="surface-card group block p-4 hover:border-primary/45"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Favicon letter={r.letter} />
                        <span className="truncate text-xs text-muted-foreground">{r.url}</span>
                      </div>
                      <h3 className="mt-2.5 text-[17px] font-medium transition-colors duration-300 group-hover:text-primary">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {r.snippet}
                      </p>
                    </motion.a>
                  ))}
            </div>
          </section>

          {/* Images */}
          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase">Images</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-4/3 rounded-2xl" />
                  ))
                : imageResults.map((img, i) => (
                    <motion.a
                      key={img.label}
                      href="#"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: i * 0.05, ease }}
                      whileHover={{ y: -4 }}
                      className="surface-card group relative aspect-4/3 overflow-hidden hover:border-primary/45"
                    >
                      <span
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `radial-gradient(120% 90% at 20% 0%, oklch(0.5 0.19 ${img.hue}) 0%, oklch(0.2 0.03 ${img.hue}) 55%, oklch(0.16 0 0) 100%)`,
                        }}
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 to-transparent p-3">
                        <span className="block truncate text-xs font-medium">{img.label}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {img.from}
                        </span>
                      </span>
                    </motion.a>
                  ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-40 lg:self-start">
          <div className="surface-card p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
              <HelpCircle className="size-3.5 text-primary" /> Related
            </div>
            <ul className="space-y-1">
              {relatedQuestions.map((rq) => (
                <li key={rq}>
                  <button className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors duration-200 hover:bg-surface">
                    <span className="min-w-0">{rq}</span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
              <TrendingUp className="size-3.5 text-primary" /> Trending
            </div>
            <ul className="space-y-1">
              {trending.slice(0, 5).map((t) => (
                <li key={t.q}>
                  <button className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors duration-200 hover:bg-surface">
                    <span className="min-w-0 truncate text-sm">{t.q}</span>
                    <span className="shrink-0 text-[11px] text-primary">{t.delta}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}