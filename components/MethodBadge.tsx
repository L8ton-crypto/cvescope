import { DiscoveryMethod, METHOD_LABELS } from "@/lib/types";

const STYLES: Record<DiscoveryMethod, string> = {
  mythos: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  "big-sleep": "bg-sky-500/10 text-sky-300 border-sky-500/30",
  "copilot-autofix": "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  human: "bg-zinc-700/30 text-zinc-300 border-zinc-600/30",
};

export function MethodBadge({ method }: { method: DiscoveryMethod }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${STYLES[method]}`}
    >
      {METHOD_LABELS[method]}
    </span>
  );
}
