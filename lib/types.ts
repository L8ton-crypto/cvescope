export type DiscoveryMethod = "mythos" | "big-sleep" | "copilot-autofix" | "human";
export type Severity = "critical" | "high" | "medium" | "low" | "unrated";
export type PatchStatus = "patched" | "in-disclosure" | "unpatched";

export type CveEntry = {
  id: string;
  vendor: string;
  product: string;
  component?: string;
  vulnType: string;
  severity: Severity;
  cvss?: number;
  discoveryMethod: DiscoveryMethod;
  discoveryCredit: string;
  disclosedAt: string;
  patchedAt?: string;
  ageYears?: number;
  glasswingPartner?: string;
  patchStatus: PatchStatus;
  summary: string;
  source: { label: string; url: string };
  notes?: string;
};

export const SEVERITY_RANK: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
  unrated: 0,
};

export const METHOD_LABELS: Record<DiscoveryMethod, string> = {
  mythos: "Claude Mythos",
  "big-sleep": "Big Sleep",
  "copilot-autofix": "Copilot Autofix",
  human: "Human + AI assist",
};

export function daysToPatch(entry: CveEntry): number | null {
  if (!entry.patchedAt) return null;
  const disclosed = new Date(entry.disclosedAt).getTime();
  const patched = new Date(entry.patchedAt).getTime();
  return Math.max(0, Math.round((patched - disclosed) / 86400000));
}
