import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/quixo/Nav";
import { Footer } from "@/components/quixo/Footer";
import { SearchBar } from "@/components/quixo/SearchBar";
import { categories, trending, recent } from "@/components/quixo/data";

const pageTitle = "Quixo — The premium AI answer engine";
const pageDescription = "Quixo is a fast, private AI search engine that returns grounded answers with real sources instead of ten blue links.";
const ease = [0.22, 1, 0.36, 1];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: pageTitle }, { name: "description", content: pageDescription }, { property: "og:title", content: pageTitle }, { property: "og:description", content: pageDescription }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomePage,
});

function SectionTitle({ icon: Icon, children }) {
  return <div className="mb-5 flex items-center gap-2.5"><Icon className="size-4 text-primary" /><h2 className="text-sm font-semibold tracking-widest uppercase">{children}</h2></div>;
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("AI");
  const navigate = useNavigate();
  const openSearch = (query) => navigate({ to: "/search", search: { q: query } });

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="halo pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-24 pb-16 text-center sm:pt-32">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground">Now answering with live sources</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.07, ease }} className="mt-7 text-4xl leading-[1.05] font-semibold sm:text-6xl">Search that thinks<br /><span className="text-gradient-crimson">before it answers.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.14, ease }} className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">One question, one clear answer, every source shown. Quixo reads the web so you can stop skimming it.</motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="mt-10 w-full"><SearchBar /></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return <motion.button key={category} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveCategory(category)} className="rounded-full border px-4 py-2 text-sm transition-colors duration-300" style={{ borderColor: isActive ? "color-mix(in oklab, var(--primary) 55%, transparent)" : "var(--border)", backgroundColor: isActive ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "var(--surface)", color: isActive ? "var(--accent-glow)" : "var(--muted-foreground)" }}>{category}</motion.button>;
              })}
            </motion.div>
          </div>
        </section>

        <section id="trending" className="mx-auto max-w-6xl px-5 py-10">
          <SectionTitle icon={TrendingUp}>Trending now</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((item, index) => <motion.button key={item.q} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: index * 0.05, ease }} whileHover={{ y: -4 }} onClick={() => openSearch(item.q)} className="surface-card group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left hover:border-primary/45"><div className="min-w-0"><p className="truncate text-[15px] font-medium">{item.q}</p><p className="mt-1 text-xs text-muted-foreground">{item.tag} · <span className="text-primary">{item.delta}</span></p></div><ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" /></motion.button>)}
          </div>
        </section>

        <section id="recent" className="mx-auto max-w-6xl px-5 py-10">
          <SectionTitle icon={Clock}>Recent searches</SectionTitle>
          <div className="surface-card divide-y divide-border overflow-hidden">
            {recent.map((item, index) => <motion.button key={item.q} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} onClick={() => openSearch(item.q)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-surface"><span className="truncate text-sm">{item.q}</span><span className="shrink-0 text-xs text-muted-foreground">{item.when}</span></motion.button>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
