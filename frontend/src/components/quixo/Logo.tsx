import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span
        className="grid size-8 place-items-center rounded-[10px] border border-border transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: "var(--gradient-crimson)", boxShadow: "var(--shadow-glow)" }}
      >
        <span className="size-2.5 rounded-full bg-foreground/90" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Quixo
        </span>
      )}
    </Link>
  );
}
