
import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

const linkGroups = [
  {
    heading: "Product",
    items: [
      { label: "Search", to: "/search" },
      { label: "Quixo Pro", to: null },
      { label: "Extensions", to: null },
      { label: "API", to: null },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", to: null },
      { label: "Careers", to: null },
      { label: "Press", to: null },
    ],
  },
  {
    heading: "Privacy",
    items: [
      { label: "No tracking", to: null },
      { label: "Data policy", to: null },
      { label: "Security", to: null },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.07] bg-[#050309]">
      {/* Subtle violet atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(110,55,190,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:py-16">
        {/* Brand */}
        <div className="max-w-sm">
          <Link
            to="/"
            aria-label="QUIXO homepage"
            className="inline-flex items-center rounded-md transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={logo}
              alt="QUIXO"
              className="h-10 w-auto max-w-[160px] object-contain"
            />
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-[#968ba8]">
            An answer engine built for focus. Private by default, fast by
            design.
          </p>

          <div className="mt-6 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.16em] text-[#8e7da6] uppercase">
              A different way to discover
            </span>
          </div>
        </div>

        {/* Navigation groups */}
        {linkGroups.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-[#b9a8d1] uppercase">
              {group.heading}
            </h2>

            <ul className="mt-5 space-y-3.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-1.5 text-sm text-[#93869f] transition-colors duration-200 hover:text-violet-300"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="translate-x-[-3px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className="cursor-default text-sm text-[#71657e]"
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-[#766b83] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Quixo Labs</p>

          <p className="tracking-wide">
            Crafted for people who think in questions.
          </p>
        </div>
      </div>
    </footer>
  );
}

