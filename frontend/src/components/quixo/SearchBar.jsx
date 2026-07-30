import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search, Mic, Sparkles, CornerDownLeft } from "lucide-react";

export function SearchBar({ initialValue = "", compact = false }) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery) navigate({ to: "/search", search: { q: searchQuery } });
  }

  return (
    <motion.form onSubmit={handleSubmit} animate={{ scale: isFocused ? 1.008 : 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative w-full">
      <div
        className="relative flex items-center gap-2 rounded-2xl border bg-elevated px-3 transition-all duration-300"
        style={{ height: compact ? 52 : 64, borderColor: isFocused ? "color-mix(in oklab, var(--primary) 55%, transparent)" : "var(--border)", boxShadow: isFocused ? "var(--shadow-glow)" : "var(--shadow-soft)" }}
      >
        <Search className="ml-1 size-4.5 shrink-0 text-muted-foreground" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Ask Quixo anything…" aria-label="Search Quixo" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70" />
        <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary sm:inline-flex"><motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="size-1.5 rounded-full bg-primary" />AI</span>
        <button type="button" aria-label="Search by voice" onClick={() => setIsListening(!isListening)} className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-surface transition-all duration-300 hover:border-primary/50 hover:text-primary">
          <motion.span animate={isListening ? { scale: [1, 1.18, 1] } : { scale: 1 }} transition={{ duration: 1.1, repeat: isListening ? Infinity : 0 }}><Mic className={`size-4 ${isListening ? "text-primary" : ""}`} /></motion.span>
        </button>
        <button type="submit" aria-label="Submit search" className="grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 hover:scale-105" style={{ backgroundImage: "var(--gradient-crimson)" }}><CornerDownLeft className="size-4" /></button>
      </div>
      {!compact && <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><Sparkles className="size-3 text-primary" />Grounded answers with sources — no tracking, ever.</p>}
    </motion.form>
  );
}
