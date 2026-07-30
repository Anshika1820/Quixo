import { search } from "@/api/searchApi";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, TrendingUp, HelpCircle, ArrowUpRight, Copy, Share2 } from "lucide-react";
import { Logo } from "@/components/quixo/Logo";
import { SearchBar } from "@/components/quixo/SearchBar";
import { Footer } from "@/components/quixo/Footer";
import { categories, sources, webResults, imageResults, relatedQuestions, trending } from "@/components/quixo/data";

const pageTitle = "Quixo Search Results — grounded answers with sources";
const pageDescription = "See the Quixo results experience: an AI answer card with cited sources, web results, image results, and related questions.";
const ease = [0.22, 1, 0.36, 1];

export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : "how do AI answer engines work" }),
  head: () => ({ meta: [{ title: pageTitle }, { name: "description", content: pageDescription }, { property: "og:title", content: pageTitle }, { property: "og:description", content: pageDescription }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: SearchPage,
});

function Favicon({ letter }) {
  return <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border text-[11px] font-semibold" style={{ backgroundImage: "var(--gradient-crimson)" }}>{letter}</span>;
}

function Skeleton({ className = "" }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

function SectionHeading({ children }) {
  return <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase">{children}</h2>;
}

function SearchPage() {
  const { q: query } = Route.useSearch();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState("AI");

 useEffect(() => {
  async function loadSearch() {
    setLoading(true);

    try {
      const data = await search(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }

  loadSearch();
}, [query]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-3">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-5"><Logo compact /><SearchBar initialValue={query} compact /></div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((category) => <button key={category} onClick={() => setActiveTab(category)} className="shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300" style={{ backgroundColor: activeTab === category ? "color-mix(in oklab, var(--primary) 16%, transparent)" : "transparent", color: activeTab === category ? "var(--accent-glow)" : "var(--muted-foreground)" }}>{category}</button>)}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          <AnswerCard query={query} loading={loading} />
          <WebResults
    loading={loading}
    results={results}
/>
          <ImageResults loading={loading} />
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}

function AnswerCard({ query, loading }) {
  return (
    <section className="surface-card relative overflow-hidden p-5 sm:p-6">
      <div className="halo pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-primary uppercase"><Sparkles className="size-3.5" />Quixo answer</div>
        <h1 className="mt-3 text-xl leading-snug font-semibold sm:text-2xl">{query}</h1>
        {loading ? <div className="mt-5 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-4 w-9/12" /><Skeleton className="h-4 w-10/12" /></div> : <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/85"><p>An answer engine first retrieves a small set of highly relevant passages, then asks a language model to compose a response grounded strictly in those passages. The links you see are evidence for each claim rather than destinations to sift through.</p><p>Quality comes from the retrieval stage: hybrid lexical and dense search catches both exact terms and intent, reranking trims noise, and citations keep the model honest.</p></motion.div>}
        <SourceList loading={loading} />
        <div className="mt-5 flex gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-primary"><Copy className="size-3.5" />Copy</button><button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-primary"><Share2 className="size-3.5" />Share</button></div>
      </div>
    </section>
  );
}

function SourceList({ loading }) {
  if (loading) return <div className="mt-6 flex flex-wrap gap-2">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-9 w-40 rounded-xl" />)}</div>;
  return <div className="mt-6 flex flex-wrap gap-2">{sources.map((source, index) => <motion.a key={source.name} href="#" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * index, ease }} whileHover={{ y: -2 }} className="flex max-w-[240px] items-center gap-2 rounded-xl border border-border bg-surface px-2.5 py-2 transition-colors duration-300 hover:border-primary/50"><Favicon letter={source.letter} /><span className="min-w-0"><span className="block truncate text-xs font-medium">{source.title}</span><span className="block truncate text-[11px] text-muted-foreground">{source.name}</span></span></motion.a>)}</div>;
}

function WebResults({ loading, results }){
  return <section><SectionHeading>Web results</SectionHeading>
  <div className="space-y-3">{loading ? Array.from({ length: 3 }, (_, index) => <div key={index} className="surface-card space-y-3 p-4"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div>) : results.map((result, index) => (
  <motion.a
    key={result.title}
    href={result.url}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.06, ease }}
    whileHover={{ y: -3 }}
    className="surface-card group block p-4 hover:border-primary/45"
  >
    <div className="flex min-w-0 items-center gap-2.5">
      <Favicon letter={result.title.charAt(0)} />
      <span className="truncate text-xs text-muted-foreground">
        {result.url}
      </span>
    </div>

    <h3 className="mt-2.5 text-[17px] font-medium transition-colors duration-300 group-hover:text-primary">
      {result.title}
    </h3>

    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
      {result.description}
    </p>
  </motion.a>
))}</div></section>;
}

function ImageResults({ loading }) {
  return <section><SectionHeading>Images</SectionHeading><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{loading ? Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="aspect-4/3 rounded-2xl" />) : imageResults.map((image, index) => <motion.a key={image.label} href="#" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: index * 0.05, ease }} whileHover={{ y: -4 }} className="surface-card group relative aspect-4/3 overflow-hidden hover:border-primary/45"><span className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `radial-gradient(120% 90% at 20% 0%, oklch(0.5 0.19 ${image.hue}) 0%, oklch(0.2 0.03 ${image.hue}) 55%, oklch(0.16 0 0) 100%)` }} /><span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 to-transparent p-3"><span className="block truncate text-xs font-medium">{image.label}</span><span className="block truncate text-[11px] text-muted-foreground">{image.from}</span></span></motion.a>)}</div></section>;
}

function Sidebar() {
  return <aside className="min-w-0 space-y-6 lg:sticky lg:top-40 lg:self-start"><SidebarCard icon={HelpCircle} title="Related">{relatedQuestions.map((question) => <button key={question} className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors duration-200 hover:bg-surface"><span className="min-w-0">{question}</span><ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" /></button>)}</SidebarCard><SidebarCard icon={TrendingUp} title="Trending">{trending.slice(0, 5).map((item) => <button key={item.q} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors duration-200 hover:bg-surface"><span className="min-w-0 truncate text-sm">{item.q}</span><span className="shrink-0 text-[11px] text-primary">{item.delta}</span></button>)}</SidebarCard></aside>;
}

function SidebarCard({ icon: Icon, title, children }) {
  return <div className="surface-card p-4"><div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"><Icon className="size-3.5 text-primary" />{title}</div><div className="space-y-1">{children}</div></div>;
}
