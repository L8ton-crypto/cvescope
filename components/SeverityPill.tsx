import { Severity } from "@/lib/types";

const STYLES: Record<Severity, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/30",
  high: "bg-orange-500/10 text-orange-300 border-orange-500/30",
  medium: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  unrated: "bg-zinc-700/30 text-zinc-300 border-zinc-600/30",
};

export function SeverityPill({ severity, cvss }: { severity: Severity; cvss?: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${STYLES[severity]}`}
    >
      {severity}
      {typeof cvss === "number" && <span className="opacity-70">{cvss.toFixed(1)}</span>}
    </span>
  );
}
