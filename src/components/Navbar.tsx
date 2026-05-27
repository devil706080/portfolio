import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[94%] max-w-4xl" : "w-[96%] max-w-5xl"
      }`}
    >
      <nav className={`glass-strong flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6 ${scrolled ? "glow-cyan" : ""}`}>
        <a href="#hero" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] text-[var(--background)]">
            A
          </span>
          <span className="hidden sm:inline">Anshika Tyagi</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/Anshika_Tyagi_Resume.pdf"
          download
          className="rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] px-4 py-1.5 text-xs font-semibold text-[var(--background)] shadow-[0_0_20px_oklch(0.85_0.18_200/40%)] transition-transform hover:scale-105"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
