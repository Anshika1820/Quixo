
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

const animation = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export function Nav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={animation}
      className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#030207]/85 backdrop-blur-2xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5"
      >
        {/* Brand */}
        <Link
          to="/"
          aria-label="QUIXO homepage"
          className="flex shrink-0 items-center rounded-md transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src={logo}
            alt="QUIXO"
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            to="/search"
            search={{ q: "how do neural search engines work", mode: "EXPLORE" }}
            className={`group inline-flex items-center gap-1.5 text-sm transition-colors duration-200 ${
              pathname === "/search"
                ? "text-violet-300"
                : "text-[#a197b0] hover:text-white"
            }`}
          >
            Discover
            <ArrowUpRight
              size={13}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>

          {isHome && (
            <>
              <a
                href="#trending"
                className="text-sm text-[#a197b0] transition-colors duration-200 hover:text-white"
              >
                Trending
              </a>

              <a
                href="#recent"
                className="text-sm text-[#a197b0] transition-colors duration-200 hover:text-white"
              >
                History
              </a>
            </>
          )}
        </div>

        {/* Pro action */}
        <button
          type="button"
          title="Quixo Pro — coming soon"
          onClick={() => {
            // Pro features will be connected when their page is implemented.
          }}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-3.5 py-2 text-xs font-medium text-[#e4d6ff] transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/[0.13] sm:px-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Sparkles
            size={14}
            className="text-violet-300 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
          <span>Quixo Pro</span>
        </button>
      </nav>
    </motion.header>
  );
}

