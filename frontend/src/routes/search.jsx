import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  BookOpen,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  Globe2,
  GraduationCap,
  Newspaper,
  Search as SearchIcon,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

import { search } from "@/api/searchApi";
import quixoLogo from "../assets/logo.png";
import { SearchBar } from "@/components/quixo/SearchBar";
import { Footer } from "@/components/quixo/Footer";

const modes = [
  {
    id: "EXPLORE",
    label: "Explore",
    icon: Globe2,
    description: "Discover the wider web.",
    resultsLabel: "Web results",
  },
  {
    id: "LEARN",
    label: "Learn",
    icon: GraduationCap,
    description: "Find explanations and learning resources.",
    resultsLabel: "Learning resources",
  },
  {
    id: "CAREER",
    label: "Career",
    icon: BriefcaseBusiness,
    description: "Explore jobs and career opportunities.",
    resultsLabel: "Career opportunities",
  },
  {
    id: "RESEARCH",
    label: "Research",
    icon: BookOpen,
    description: "Explore research and news sources.",
    resultsLabel: "Research and news",
  },
];

const ease = [0.22, 1, 0.36, 1];

export const Route = createFileRoute("/search")({
  validateSearch: (searchParams) => ({
    q: typeof searchParams.q === "string" ? searchParams.q : "",
    mode: modes.some((item) => item.id === searchParams.mode)
      ? searchParams.mode
      : "EXPLORE",
  }),
  head: () => ({
    meta: [
      { title: "Search | QUIXO" },
      {
        name: "description",
        content:
          "Explore, learn, research, and discover information with QUIXO.",
      },
    ],
  }),
  component: SearchPage,
});

function Skeleton({ className = "" }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

function SearchPage() {
  const { q: query, mode } = Route.useSearch();
  const navigate = useNavigate();

  const requestId = useRef(0);

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showJourney, setShowJourney] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const results = Array.isArray(response?.searchResult)
    ? response.searchResult
    : [];

  const metadata = response?.searchExecutionMetadata;
  const activeMode = modes.find((item) => item.id === mode) ?? modes[0];

  useEffect(() => {
    const currentRequestId = ++requestId.current;
    const trimmedQuery = query.trim();

    setFeedback("");

    if (!trimmedQuery) {
      setResponse(null);
      setError("");
      setLoading(false);

      return () => {
        requestId.current++;
      };
    }

    let cancelled = false;

    async function loadSearch() {
      setLoading(true);
      setError("");
      setResponse(null);

      try {
        const data = await search(trimmedQuery, mode);

        if (!cancelled && requestId.current === currentRequestId) {
          setResponse(data);
        }
      } catch (err) {
        if (!cancelled && requestId.current === currentRequestId) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
          );
        }
      } finally {
        if (!cancelled && requestId.current === currentRequestId) {
          setLoading(false);
        }
      }
    }

    loadSearch();

    return () => {
      cancelled = true;
    };
  }, [query, mode, retryCount]);

  function changeMode(nextMode) {
    if (!modes.some((item) => item.id === nextMode)) return;

    setShowJourney(false);

    navigate({
      to: "/search",
      search: { q: query, mode: nextMode },
    });
  }

  async function copyResults() {
    const text = [
      `QUIXO search: ${query}`,
      `Mode: ${activeMode.label}`,
      "",
      ...results.map(
        (item, index) =>
          `${index + 1}. ${item.title || "Untitled result"}\n${item.link || ""}\n${item.snippet || ""}`,
      ),
    ].join("\n\n");

    try {
      await copyToClipboard(text);
      setFeedback("Results copied to clipboard.");
    } catch {
      setFeedback("Unable to copy results. Check browser permissions.");
    }
  }

  async function shareSearch() {
    const url = window.location.href;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: `QUIXO — ${query}`,
          text: `Explore these ${activeMode.label.toLowerCase()} results.`,
          url,
        });

        setFeedback("Share menu opened.");
      } else {
        await copyToClipboard(url);
        setFeedback("Search link copied to clipboard.");
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        setFeedback("Unable to share this search.");
      }
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#08070b] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#08070b]/90 backdrop-blur-2xl">
        <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              aria-label="Back to home"
              title="Back to home"
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.02] text-zinc-400 transition hover:border-violet-400/40 hover:bg-violet-400/[0.07] hover:text-white"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              aria-label="Go to QUIXO homepage"
              className="flex shrink-0 items-center"
            >
              <img
                src={quixoLogo}
                alt="QUIXO"
                className="block h-10 w-auto max-w-[160px] object-contain"
              />
            </button>

            <div className="min-w-0 flex-1">
              <SearchBar
                initialValue={query}
                initialMode={mode}
                compact
              />
            </div>
          </div>

          <nav
            aria-label="Search modes"
            className="mt-4 flex gap-2 overflow-x-auto pb-1"
          >
            {modes.map(({ id, label, icon: Icon }) => {
              const active = mode === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => changeMode(id)}
                  aria-pressed={active}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition-all duration-200 ${
                    active
                      ? "border-violet-400/35 bg-violet-400/[0.09] text-violet-200 shadow-[inset_0_0_18px_rgba(139,92,246,0.035)]"
                      : "border-white/[0.07] bg-white/[0.015] text-zinc-400 hover:border-violet-400/25 hover:text-zinc-100"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                  {active && (
                    <span className="ml-0.5 size-1.5 rounded-full bg-violet-300" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-10 lg:py-10">
        <div className="min-w-0 space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="relative isolate overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0a10] p-5 sm:p-7"
          >
            <div className="pointer-events-none absolute -right-20 -top-28 -z-10 size-72 rounded-full bg-violet-700/[0.10] blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-28 left-1/3 -z-10 size-52 rounded-full bg-indigo-900/[0.08] blur-[90px]" />

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              <Sparkles size={14} />
              <span>Search workspace</span>
              <span className="text-zinc-700">/</span>
              <span>{activeMode.label}</span>
            </div>

            <h1 className="mt-5 break-words text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {query || "What do you want to discover?"}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              {response?.description || activeMode.description}
            </p>

            {metadata && !loading && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 size={13} />
                  {metadata.engine || "Web search"}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <SearchIcon size={13} />
                  {metadata.resultCount ?? results.length} results
                </span>

                {metadata.executedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {formatDate(metadata.executedAt)}
                  </span>
                )}
              </div>
            )}

            {query && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                <button
                  type="button"
                  onClick={copyResults}
                  disabled={loading || results.length === 0}
                  title="Copy search results"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:border-violet-400/30 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Copy size={14} />
                  Copy results
                </button>

                <button
                  type="button"
                  onClick={shareSearch}
                  title="Share this search"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:border-violet-400/30 hover:text-violet-200"
                >
                  <Share2 size={14} />
                  Share search
                </button>

                <button
                  type="button"
                  onClick={() => setShowJourney((value) => !value)}
                  aria-expanded={showJourney}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:border-violet-400/30 hover:text-violet-200"
                >
                  <ArrowUpRight size={14} />
                  Search journey
                </button>
              </div>
            )}

            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className="mt-3 text-xs text-violet-300"
              >
                {feedback}
              </p>
            )}
          </motion.section>

          {showJourney && (
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/[0.08] bg-[#0b090f] p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    Investigation thread
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Use this query as the starting point for your next
                    exploration.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowJourney(false)}
                  title="Close journey panel"
                  aria-label="Close journey panel"
                  className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/[0.05] px-3 py-2 text-sm text-violet-200">
                <SearchIcon size={14} />
                <span className="break-all">{query}</span>
              </div>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Related searches and saved search history are not connected
                yet. This panel currently shows your active investigation.
              </p>
            </motion.section>
          )}

          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/80">
                  The web, organized
                </p>
                <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                  {activeMode.resultsLabel}
                </h2>
              </div>

              {!loading && results.length > 0 && (
                <span className="rounded-lg border border-white/[0.07] px-2.5 py-1.5 text-xs text-zinc-400">
                  {results.length} found
                </span>
              )}
            </div>

            {loading ? (
              <div
                className="space-y-3"
                aria-label="Loading search results"
                aria-busy="true"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/[0.06] bg-[#0b090f] p-5"
                  >
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="mt-4 h-5 w-3/4" />
                    <Skeleton className="mt-4 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-5/6" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-400/20 bg-red-400/[0.035] p-6"
              >
                <h3 className="font-semibold text-red-300">
                  Search couldn&apos;t be completed
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-zinc-400">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => setRetryCount((count) => count + 1)}
                  className="mt-4 rounded-lg border border-white/[0.09] px-4 py-2 text-sm transition hover:border-violet-400/30 hover:text-violet-200"
                >
                  Try again
                </button>
              </div>
            ) : !query.trim() ? (
              <EmptyState
                title="Start with a question"
                description="Enter a query in the search bar to discover real results from the web."
              />
            ) : results.length === 0 ? (
              <EmptyState
                title="No results found"
                description="Try another search phrase or switch to a different QUIXO mode."
              />
            ) : (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <ResultCard
                    key={`${result.link || result.title || "result"}-${index}`}
                    result={result}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-36 lg:self-start">
          <section className="rounded-2xl border border-white/[0.08] bg-[#0b090f] p-5">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg border border-violet-400/20 bg-violet-400/[0.06]">
                <Sparkles size={15} className="text-violet-300" />
              </span>
              <h2 className="font-semibold">Search intelligence</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              QUIXO retrieves results for your selected mode. Visit the
              original sources to verify details and explore further.
            </p>

            <div className="mt-5 space-y-3 border-t border-white/[0.07] pt-4">
              <InfoRow label="Mode" value={activeMode.label} />
              <InfoRow
                label="Status"
                value={
                  loading
                    ? "Searching"
                    : error
                      ? "Failed"
                      : response
                        ? "Complete"
                        : "Ready"
                }
              />
              <InfoRow
                label="Results"
                value={loading ? "…" : String(results.length)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-[#0b090f] p-5">
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-violet-300" />
              <h2 className="font-semibold">Explore modes</h2>
            </div>

            <div className="mt-4 space-y-1">
              {modes.map(({ id, label, description, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => changeMode(id)}
                  aria-pressed={mode === id}
                  title={description}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    mode === id
                      ? "bg-violet-400/[0.08] text-violet-200"
                      : "text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-100"
                  }`}
                >
                  <Icon size={16} />
                  <span className="flex-1">{label}</span>
                  {mode === id && <Check size={14} />}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-violet-400/[0.12] bg-gradient-to-br from-violet-500/[0.055] to-transparent p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              A different perspective
            </p>

            <p className="mt-3 text-lg font-medium leading-snug">
              One question. Different ways to explore.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Switch modes to approach your search from a different angle.
            </p>
          </section>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

function ResultCard({ result, index }) {
  const title = result.title || "Untitled result";
  const link = safeUrl(result.link);
  const image = safeUrl(result.image);
  const snippet =
    result.snippet || "No description was provided for this result.";
  const source = result.source || getHostname(link);
  const sourceType = result.sourceType || "WEB";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.045, 0.25),
        ease,
      }}
      className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b090f] p-4 transition-colors duration-200 hover:border-violet-400/[0.23] hover:bg-[#0d0a12] sm:p-5"
    >
      <div className="flex items-start gap-3">
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="hidden size-[68px] shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.02] object-cover sm:block"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="max-w-full truncate">{source}</span>
            <span className="text-zinc-700">/</span>
            <span className="rounded-md border border-violet-400/[0.16] bg-violet-400/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet-300">
              {sourceType}
            </span>

            {result.date && (
              <span className="inline-flex items-center gap-1">
                <Clock3 size={11} />
                {result.date}
              </span>
            )}
          </div>

          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex max-w-full items-start gap-2 text-base font-semibold leading-snug text-zinc-100 transition-colors hover:text-violet-200"
            >
              <span className="break-words">{title}</span>
              <ExternalLink
                size={14}
                className="mt-1 shrink-0 text-zinc-500 transition-colors group-hover:text-violet-300"
              />
            </a>
          ) : (
            <h3 className="mt-2 break-words text-base font-semibold text-zinc-100 sm:text-lg">
              {title}
            </h3>
          )}

          <p className="mt-2 break-words text-sm leading-6 text-zinc-400">
            {snippet}
          </p>

          {link && (
            <p className="mt-3 truncate text-xs text-violet-300/60">
              {link}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/[0.07] bg-[#0b090f] px-5 py-14 text-center">
      <div className="grid size-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] text-violet-300">
        <SearchIcon size={21} />
      </div>

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="max-w-[60%] truncate text-right font-medium text-zinc-200">
        {value}
      </span>
    </div>
  );
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Clipboard access is unavailable.");
  }
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function safeUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value);

    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function getHostname(value) {
  if (!value) return "Search result";

  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "Search result";
  }
}

