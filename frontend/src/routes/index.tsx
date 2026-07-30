import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/quixo/Nav";
import { Footer } from "@/components/quixo/Footer";
import { SearchBar } from "@/components/quixo/SearchBar";
import { categories, trending, recent } from "@/components/quixo/data";

const title = "Quixo — The premium AI answer engine";
const description =
  "Quixo is a fast, private AI search engine that returns grounded answers with real sources instead of ten blue links.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Index() {
  const [active, setActive] = useState<string>("AI");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main>
        <section className="relative overflow-hidden">
          <div className="halo pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-24 pb-16 text-center sm:pt-32">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground"
            >
              Now answering with live sources
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.07, ease }}
              className="mt-7 text-4xl leading-[1.05] font-semibold sm:text-6xl"
            >
              Search that thinks
              <br />
              <span className="text-gradient-crimson">before it answers.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            >
              One question, one clear answer, every source shown. Quixo reads the web so
              you can stop skimming it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-10 w-full"
            >
              <SearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-2"
            >
              {categories.map((c) => {
                const on = c === active;
                return (
                  <motion.button
                    key={c}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(c)}
                    className="rounded-full border px-4 py-2 text-sm transition-colors duration-300"
                    style={{
                      borderColor: on
                        ? "color-mix(in oklab, var(--primary) 55%, transparent)"
                        : "var(--border)",
                      backgroundColor: on
                        ? "color-mix(in oklab, var(--primary) 14%, transparent)"
                        : "var(--surface)",
                      color: on ? "var(--accent-glow)" : "var(--muted-foreground)",
                    }}
                  >
                    {c}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="trending" className="mx-auto max-w-6xl px-5 py-10">
          <div className="mb-5 flex items-center gap-2.5">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-widest uppercase">Trending now</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((t, i) => (
              <motion.button
                key={t.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                whileHover={{ y: -4 }}
                onClick={() => navigate({ to: "/search", search: { q: t.q } })}
                className="surface-card group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left hover:border-primary/45"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium">{t.q}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.tag} · <span className="text-primary">{t.delta}</span>
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </motion.button>
            ))}
          </div>
        </section>

        <section id="recent" className="mx-auto max-w-6xl px-5 py-10">
          <div className="mb-5 flex items-center gap-2.5">
            <Clock className="size-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-widest uppercase">Recent searches</h2>
          </div>
          <div className="surface-card divide-y divide-border overflow-hidden">
            {recent.map((r, i) => (
              <motion.button
                key={r.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => navigate({ to: "/search", search: { q: r.q } })}
                className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-surface"
              >
                <span className="truncate text-sm">{r.q}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.when}</span>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
