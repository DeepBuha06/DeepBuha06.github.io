const LINKS = [
  { label: "Projects", id: "projects" },
  { label: "Log", id: "log" },
  { label: "Writings", id: "writings" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-lg border-b border-border">
      <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-14">
        <a href="#top" className="text-[15px] font-semibold text-ink tracking-tight">
          Deep Buha
        </a>
        <div className="flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-[14px] text-ink-tertiary hover:text-warm transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
