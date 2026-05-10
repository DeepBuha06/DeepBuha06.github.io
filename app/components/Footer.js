export default function Footer() {
  return (
    <footer className="py-12 mt-10 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-tertiary">© 2026 Deep Buha</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/DeepBuha06" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-tertiary hover:text-warm transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/deepbuha/" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-tertiary hover:text-warm transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
