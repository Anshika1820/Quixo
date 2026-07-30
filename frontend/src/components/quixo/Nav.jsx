import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Logo } from "./Logo";

const animation = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={animation}
      className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <div className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          <Link to="/search" search={{ q: "how do neural search engines work" }} className="transition-colors hover:text-foreground">Discover</Link>
          <a href="#trending" className="transition-colors hover:text-foreground">Trending</a>
          <a href="#recent" className="transition-colors hover:text-foreground">History</a>
        </div>
        <button className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium transition-all duration-300 hover:border-primary/60" style={{ boxShadow: "var(--shadow-soft)" }}>
          <Sparkles className="size-3.5 text-primary" />
          Quixo Pro
        </button>
      </nav>
    </motion.header>
  );
}
