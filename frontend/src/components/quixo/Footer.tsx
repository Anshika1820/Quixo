import { Logo } from "./Logo";

const groups = [
  { title: "Product", links: ["Search", "Quixo Pro", "Extensions", "API"] },
  { title: "Company", links: ["About", "Careers", "Press"] },
  { title: "Privacy", links: ["No tracking", "Data policy", "Security"] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="min-w-0">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            An answer engine built for focus. Private by default, fast by design.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title} className="min-w-0">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {g.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {g.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-foreground/75 transition-colors duration-200 hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-border/70 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Quixo Labs</p>
        <p>Crafted for people who think in questions.</p>
      </div>
    </footer>
  );
}