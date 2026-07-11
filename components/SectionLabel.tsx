export function SectionLabel({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.24em] ${
        tone === "light" ? "text-bronze" : "text-bronze-lite"
      }`}
    >
      <span className="inline-block h-px w-8 bg-bronze" />
      {children}
    </span>
  );
}
