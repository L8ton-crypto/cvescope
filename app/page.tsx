"use client";

import { useMemo, useState } from "react";
import { CVES, AGGREGATE_STATS, VENDORS } from "@/lib/cves";
import { CveCard } from "@/components/CveCard";
import { DiscoveryMethod, Severity, SEVERITY_RANK, METHOD_LABELS } from "@/lib/types";

type SortKey = "disclosed-desc" | "disclosed-asc" | "severity" | "age";

const METHODS: DiscoveryMethod[] = ["mythos", "big-sleep", "copilot-autofix", "human"];
const SEVERITIES: Severity[] = ["critical", "high", "medium", "low", "unrated"];

export default function Page() {
  const [vendor, setVendor] = useState<string>("all");
  const [method, setMethod] = useState<DiscoveryMethod | "all">("all");
  const [minSev, setMinSev] = useState<Severity>("low");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("disclosed-desc");

  const filtered = useMemo(() => {
    const minRank = SEVERITY_RANK[minSev];
    const q = query.trim().toLowerCase();
    let rows = CVES.filter((c) => {
      if (vendor !== "all" && c.vendor !== vendor) return false;
      if (method !== "all" && c.discoveryMethod !== method) return false;
      if (SEVERITY_RANK[c.severity] < minRank) return false;
      if (q) {
        const hay = `${c.id} ${c.vendor} ${c.product} ${c.component ?? ""} ${c.summary} ${c.vulnType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    rows = rows.slice().sort((a, b) => {
      switch (sort) {
        case "disclosed-asc":
          return a.disclosedAt.localeCompare(b.disclosedAt);
        case "severity":
          return SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
        case "age":
          return (b.ageYears ?? 0) - (a.ageYears ?? 0);
        case "disclosed-desc":
        default:
          return b.disclosedAt.localeCompare(a.disclosedAt);
      }
    });
    return rows;
  }, [vendor, method, minSev, query, sort]);

  return (
    <>
      <section className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          AI-discovered CVE timeline
        </h1>
        <p className="text-zinc-400 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
          The first publicly-credited cases of AI agents finding real-world security bugs.
          Filter by vendor, severity and discovery method. Use this as the receipts for
          governance and threat-model conversations - not as an exhaustive CVE database.
        </p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
          <Stat label="CVEs tracked" value={String(CVES.length)} />
          <Stat
            label="Mythos Firefox finds"
            value={String(AGGREGATE_STATS.mythosFirefoxFindings)}
            hint="3 public CVEs"
          />
          <Stat
            label="Mozilla April fixes"
            value={String(AGGREGATE_STATS.mozillaTotalAprilFixes)}
            hint="271 Mythos / 111 internal / 41 external"
          />
          <Stat
            label="Glasswing partners"
            value={String(AGGREGATE_STATS.glasswingPartners.length)}
            hint={AGGREGATE_STATS.glasswingCredits}
          />
        </div>
      </section>

      <section className="mb-6 sm:mb-8 border border-zinc-800/80 rounded-lg bg-zinc-950/40 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
              Search
            </label>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="CVE id, vendor, component..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <Select
            label="Vendor"
            value={vendor}
            onChange={setVendor}
            options={[{ value: "all", label: "All vendors" }, ...VENDORS.map((v) => ({ value: v, label: v }))]}
          />
          <Select
            label="Method"
            value={method}
            onChange={(v) => setMethod(v as DiscoveryMethod | "all")}
            options={[
              { value: "all", label: "All methods" },
              ...METHODS.map((m) => ({ value: m, label: METHOD_LABELS[m] })),
            ]}
          />
          <Select
            label="Min severity"
            value={minSev}
            onChange={(v) => setMinSev(v as Severity)}
            options={SEVERITIES.map((s) => ({ value: s, label: s }))}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-zinc-500">
            {filtered.length} of {CVES.length} entries
          </span>
          <div className="flex items-center gap-2">
            <label className="text-zinc-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs"
            >
              <option value="disclosed-desc">Newest disclosed</option>
              <option value="disclosed-asc">Oldest disclosed</option>
              <option value="severity">Severity (high to low)</option>
              <option value="age">Bug age (oldest first)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-lg p-10 text-center text-zinc-500 text-sm">
            No entries match these filters. Loosen the severity or vendor and try again.
          </div>
        ) : (
          filtered.map((entry) => <CveCard key={entry.id} entry={entry} />)
        )}
      </section>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border border-zinc-800/80 rounded-lg bg-zinc-950/60 p-3">
      <div className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold text-zinc-100 mt-0.5">{value}</div>
      {hint && <div className="text-[11px] text-zinc-500 mt-0.5">{hint}</div>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
