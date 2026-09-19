export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-signal-hi">
      <span className="inline-block h-px w-8 bg-signal" />
      {children}
    </span>
  );
}
