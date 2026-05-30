import { CveEntry, daysToPatch } from "@/lib/types";
import { SeverityPill } from "./SeverityPill";
import { MethodBadge } from "./MethodBadge";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function CveCard({ entry }: { entry: CveEntry }) {
  const dtp = daysToPatch(entry);
  return (
    <article className="border border-zinc-800/80 rounded-lg bg-zinc-950/60 p-4 sm:p-5 hover:border-zinc-700 transition-colors">
      <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h2 className="font-mono text-sm sm:text-base text-emerald-300 break-all">
            {entry.id}
          </h2>
          <p className="text-zinc-100 mt-1 text-sm sm:text-base">
            <span className="font-semibold">{entry.vendor}</span>{" "}
            <span className="text-zinc-400">/ {entry.product}</span>
            {entry.component && (
              <span className="text-zinc-500"> / {entry.component}</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SeverityPill severity={entry.severity} cvss={entry.cvss} />
          <MethodBadge method={entry.discoveryMethod} />
        </div>
      </header>

      <p className="text-sm text-zinc-300 leading-relaxed">{entry.summary}</p>

      <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
        <div>
          <dt className="text-zinc-500">Vuln type</dt>
          <dd className="text-zinc-200">{entry.vulnType}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Disclosed</dt>
          <dd className="text-zinc-200">{fmtDate(entry.disclosedAt)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Days to patch</dt>
          <dd className="text-zinc-200">
            {dtp === null ? (
              <span className="text-amber-400">in disclosure</span>
            ) : dtp === 0 ? (
              <span className="text-emerald-400">same day</span>
            ) : (
              <span className={dtp > 30 ? "text-amber-400" : "text-emerald-400"}>{dtp}d</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Age at find</dt>
          <dd className="text-zinc-200">
            {entry.ageYears ? `${entry.ageYears}y` : <span className="text-zinc-500">n/a</span>}
          </dd>
        </div>
      </dl>

      <footer className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="text-zinc-500 truncate max-w-full sm:max-w-[60%]">
          <span className="text-zinc-400">Credit:</span> {entry.discoveryCredit}
        </div>
        <div className="flex items-center gap-3">
          {entry.glasswingPartner && (
            <span className="text-zinc-500">
              Glasswing: <span className="text-zinc-300">{entry.glasswingPartner}</span>
            </span>
          )}
          <a
            href={entry.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline"
          >
            {entry.source.label} -&gt;
          </a>
        </div>
      </footer>

      {entry.notes && (
        <p className="mt-3 text-[11px] text-zinc-500 italic">{entry.notes}</p>
      )}
    </article>
  );
}
