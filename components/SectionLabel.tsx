export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.24em] text-bronze-lite">
      <span className="inline-block h-px w-8 bg-bronze" />
      {children}
    </span>
  );
}
