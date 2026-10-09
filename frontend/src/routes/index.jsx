import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Command,
  Fingerprint,
  Globe2,
  MoveUpRight,
  Orbit,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Nav } from "@/components/quixo/Nav";
import { Footer } from "@/components/quixo/Footer";
import { SearchBar } from "@/components/quixo/SearchBar";
import { categories, trending, recent } from "@/components/quixo/data";

const pageTitle = "QUIXO — Search beyond the obvious";
const pageDescription =
  "Explore the web with QUIXO. Discover useful information, explore ideas, learn faster, and find the sources behind your results.";

const ease = [0.22, 1, 0.36, 1];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Eyebrow({ children, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a78bfa] sm:text-[11px] ${className}`}
    >
      <span className="relative flex size-2 items-center justify-center">
        <span className="absolute size-2 animate-ping rounded-full bg-[#8b5cf6]/40" />
        <span className="relative size-1.5 rounded-full bg-[#b8a0ff]" />
      </span>
      {children}
    </div>
  );
}

function OrbitalMark() {
  return (
    <div
      className="relative flex aspect-square w-full max-w-[340px] items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-[9%] rounded-full border border-violet-300/[0.12]" />
      <div className="absolute inset-[20%] rounded-full border border-violet-300/[0.15]" />
      <div className="absolute inset-[31%] rounded-full border border-violet-300/[0.19]" />

      <motion.div
        className="absolute inset-[9%] rounded-full"
        style={{
          background:
            "conic-gradient(from 20deg, transparent 0deg, rgba(139,92,246,0.03) 70deg, rgba(167,139,250,0.48) 120deg, transparent 165deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 63.6%, transparent 64.5%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 63.6%, transparent 64.5%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-[20%] rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0deg, rgba(124,58,237,0.05) 100deg, rgba(196,181,253,0.38) 155deg, transparent 210deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 63.6%, transparent 64.5%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 63.6%, transparent 64.5%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-[34%] rounded-full"
        animate={{ scale: [1, 1.045, 1], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 36% 28%, rgba(167,139,250,0.2), rgba(54,25,91,0.18) 43%, rgba(8,6,13,0.98) 75%)",
          boxShadow:
            "0 0 70px rgba(109,40,217,0.14), inset 0 0 25px rgba(167,139,250,0.08)",
        }}
      />

      <motion.div
        className="relative z-10 flex size-[74px] items-center justify-center rounded-[24px] border border-violet-200/20"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(145deg, rgba(49,30,79,0.95), rgba(12,9,19,0.98))",
          boxShadow:
            "0 0 45px rgba(124,58,237,0.17), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Orbit className="size-8 text-[#c4b5fd]" strokeWidth={1.25} />
      </motion.div>

      <motion.span
        className="absolute left-[15%] top-[27%] size-2 rounded-full bg-[#c4b5fd]"
        style={{ boxShadow: "0 0 18px rgba(196,181,253,0.8)" }}
        animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        className="absolute bottom-[23%] right-[17%] size-1.5 rounded-full bg-[#8b5cf6]"
        style={{ boxShadow: "0 0 16px rgba(139,92,246,0.9)" }}
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="absolute right-[8%] top-[35%] text-[9px] tracking-[0.2em] text-white/30">
        Q / 01
      </span>
      <span className="absolute bottom-[13%] left-[12%] text-[9px] tracking-[0.2em] text-white/30">
        DISCOVER
      </span>
    </div>
  );
}

function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
      <div>
        <Eyebrow>{number} / {eyebrow}</Eyebrow>
        <h2 className="mt-3 text-2xl font-medium tracking-[-0.055em] text-[#f2eefb] sm:text-3xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-sm text-sm leading-6 text-white/45">
          {description}
        </p>
      )}
    </div>
  );
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "AI");
  const navigate = useNavigate();

  const openSearch = (query) => {
    const trimmedQuery = query?.trim();
    if (!trimmedQuery) return;

    navigate({
      to: "/search",
      search: { q: trimmedQuery, mode: "EXPLORE" },
    });
  };

  const categorySuggestions = {
    AI: "Artificial intelligence, explained clearly.",
    Technology: "Explore the ideas shaping tomorrow.",
    Science: "Discover the world beyond the obvious.",
    Business: "Find insights behind better decisions.",
    Design: "Explore the details that make great work.",
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] text-[#f2eefb]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        <Nav />

        <main>
          {/* HERO */}
          <section className="relative border-b border-white/[0.065]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 28%, rgba(76,29,149,0.12), transparent 58%)",
              }}
            />

            <div className="relative mx-auto grid max-w-[1380px] items-center gap-5 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:pb-24 lg:pt-20">
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Eyebrow>AN INTELLIGENT WAY TO EXPLORE</Eyebrow>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.08, ease }}
                  className="mt-7 max-w-[760px] text-[clamp(3.1rem,7.1vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.075em]"
                >
                  The world is
                  <br />
                  bigger than
                  <br />
                  <span
                    className="relative inline-block text-[#bda5ff]"
                    style={{
                      textShadow: "0 0 55px rgba(139,92,246,0.16)",
                    }}
                  >
                    one answer.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                  className="mt-6 max-w-lg text-[14px] leading-7 text-white/48 sm:text-base sm:leading-8"
                >
                  Search with intention. Discover useful information, follow
                  the evidence, and find a better way to understand what
                  matters to you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.28, ease }}
                  className="mt-9 w-full max-w-[650px]"
                >
                  <div
                    className="rounded-[20px] border border-white/[0.09] p-1.5 sm:p-2"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(24,17,35,0.96), rgba(10,8,14,0.98))",
                      boxShadow:
                        "0 18px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.025)",
                    }}
                  >
                    <SearchBar />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-[10px] tracking-[0.13em] text-white/35 sm:text-[11px]">
                    <span className="inline-flex items-center gap-1.5">
                      <Fingerprint className="size-3.5 text-[#a78bfa]/75" />
                      BUILT FOR DISCOVERY
                    </span>
                    <span className="size-1 rounded-full bg-white/20" />
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="size-3.5 text-[#a78bfa]/75" />
                      REAL WEB RESULTS
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.42 }}
                  className="mt-9"
                >
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Explore by intention
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const active = category === activeCategory;

                      return (
                        <motion.button
                          key={category}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setActiveCategory(category)}
                          className="rounded-full border px-3.5 py-2 text-xs transition-colors duration-300"
                          style={{
                            borderColor: active
                              ? "rgba(167,139,250,0.42)"
                              : "rgba(255,255,255,0.09)",
                            background: active
                              ? "rgba(109,40,217,0.14)"
                              : "rgba(255,255,255,0.018)",
                            color: active ? "#c9b7ff" : "rgba(255,255,255,0.48)",
                          }}
                        >
                          {category}
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.p
                    key={activeCategory}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 text-xs text-white/35"
                  >
                    {categorySuggestions[activeCategory] ??
                      `Discover something new in ${activeCategory}.`}
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.12, ease }}
                className="relative mx-auto flex w-full max-w-[440px] items-center justify-center lg:max-w-none"
              >
                <div
                  className="pointer-events-none absolute inset-[10%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(91,33,182,0.13), transparent 66%)",
                    filter: "blur(28px)",
                  }}
                />
                <OrbitalMark />
                <div className="absolute bottom-[8%] left-1/2 w-max -translate-x-1/2 rounded-full border border-white/[0.09] bg-[#0b0910]/80 px-4 py-2 backdrop-blur-xl">
                  <span className="flex items-center gap-2 text-[10px] tracking-[0.13em] text-white/45">
                    <Sparkles className="size-3.5 text-[#b49aff]" />
                    FOLLOW YOUR CURIOSITY
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="relative mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.065] px-5 py-4 sm:px-8 lg:px-12">
              <span className="text-[9px] tracking-[0.2em] text-white/25">
                QUIXO / SEARCH INTELLIGENCE
              </span>
              <a
                href="#discover"
                className="group inline-flex items-center gap-2 text-[10px] tracking-[0.12em] text-white/40 transition-colors hover:text-[#c4b5fd]"
              >
                EXPLORE WHAT'S OUT THERE
                <ArrowDownRight className="size-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </section>

          {/* TRENDING */}
          <section
            id="discover"
            className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
          >
            <SectionHeading
              number="01"
              eyebrow="THE PULSE"
              title="Worth looking into."
              description="Ideas, questions, and topics to start your next discovery."
            />

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-12">
              {trending.slice(0, 6).map((item, index) => {
                const featured = index === 0;

                return (
                  <motion.button
                    key={item.q}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: (index % 3) * 0.07,
                      ease,
                    }}
                    whileHover={{ y: -3 }}
                    onClick={() => openSearch(item.q)}
                    className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[18px] border p-5 text-left transition-colors duration-300 sm:p-6 ${
                      featured
                        ? "border-violet-300/20 bg-[#100b19] md:col-span-2 lg:col-span-6 lg:row-span-2 lg:min-h-[300px]"
                        : "border-white/[0.075] bg-[#0b090e] hover:border-violet-300/20 md:col-span-1 lg:col-span-3"
                    }`}
                  >
                    {featured && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-90"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(109,40,217,0.2), transparent 68%)",
                        }}
                      />
                    )}

                    <div className="relative flex items-center justify-between gap-3">
                      <span className="text-[10px] tracking-[0.17em] text-white/30">
                        {String(index + 1).padStart(2, "0")} / DISCOVERY
                      </span>
                      <ArrowUpRight className="size-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c4b5fd]" />
                    </div>

                    <div className="relative mt-8">
                      <p
                        className={`max-w-[460px] font-medium leading-snug tracking-[-0.035em] text-white/90 transition-colors group-hover:text-white ${
                          featured
                            ? "text-2xl sm:text-3xl lg:text-[34px]"
                            : "text-lg"
                        }`}
                      >
                        {item.q}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-white/35">
                        {item.tag && <span>{item.tag}</span>}
                        {item.tag && item.delta && (
                          <span className="size-1 rounded-full bg-white/20" />
                        )}
                        {item.delta && (
                          <span className="text-[#b49aff]">{item.delta}</span>
                        )}
                      </div>
                    </div>

                    {featured && (
                      <span className="relative mt-6 inline-flex items-center gap-2 text-xs text-[#bda5ff]">
                        Explore this topic
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-5 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(167,139,250,0.65), transparent)",
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* RECENT SEARCHES */}
          <section  id="recent" className="scroll-mt-24 border-y border-white/[0.065] bg-[#09070b]">
            <div className="mx-auto grid max-w-[1380px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-12 lg:py-24">
              <div>
                <Eyebrow>02 / PICK UP WHERE YOU LEFT OFF</Eyebrow>
                <h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-0.055em] sm:text-4xl">
                  Curiosity doesn't end in one search.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
                  Return to an idea, revisit a question, or follow a new
                  direction.
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs text-white/30">
                  <Clock3 className="size-4 text-[#a78bfa]/70" />
                  Recent discoveries
                </div>
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.18em] text-white/30">
                    YOUR STARTING POINTS
                  </span>
                  <Command className="size-3.5 text-white/25" />
                </div>

                <div className="divide-y divide-white/[0.075] border-y border-white/[0.075]">
                  {recent.slice(0, 6).map((item, index) => (
                    <motion.button
                      key={item.q}
                      type="button"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.045,
                        ease,
                      }}
                      onClick={() => openSearch(item.q)}
                      className="group grid w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-3 py-4 text-left sm:gap-5 sm:py-5"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full border border-white/[0.08] text-[10px] text-white/35 transition-colors group-hover:border-violet-300/25 group-hover:text-[#c4b5fd]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm text-white/70 transition-colors group-hover:text-white sm:text-[15px]">
                          {item.q}
                        </span>
                        <span className="mt-1 block text-[10px] text-white/30">
                          {item.when}
                        </span>
                      </span>

                      <MoveUpRight className="size-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#bda5ff]" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CLOSING STATEMENT */}
          <section className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center top, rgba(76,29,149,0.13), transparent 68%)",
              }}
            />

            <div className="relative mx-auto flex max-w-[900px] flex-col items-center px-5 py-20 text-center sm:py-28">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/[0.07]">
                <Sparkles className="size-5 text-[#bda5ff]" />
              </div>

              <p className="mt-6 text-[10px] tracking-[0.24em] text-white/35">
                YOUR NEXT DISCOVERY STARTS HERE
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.06em] sm:text-5xl">
                Better questions lead to{" "}
                <span className="text-[#bda5ff]">better discoveries.</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                Start with a question. Let curiosity take it somewhere
                unexpected.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/[0.07] px-5 py-3 text-xs text-[#d0c1ff] transition-all duration-300 hover:border-violet-300/40 hover:bg-violet-500/[0.12]"
              >
                Back to search
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

