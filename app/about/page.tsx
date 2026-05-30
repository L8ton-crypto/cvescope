import Link from "next/link";
import { AGGREGATE_STATS } from "@/lib/cves";

export const metadata = {
  title: "About - CVEScope",
  description: "Methodology, sources, and inclusion criteria for the CVEScope dataset.",
};

export default function AboutPage() {
  return (
    <div className="prose-invert max-w-3xl space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
        About CVEScope
      </h1>

      <p>
        CVEScope is a hand-curated timeline of publicly-disclosed CVEs and security bugs
        credited to AI assistance. It exists to give security architects something concrete
        to point at in governance conversations: not the marketing announcements, the actual
        vendor advisories.
      </p>

      <h2 className="text-lg font-semibold text-zinc-100 mt-8">Inclusion criteria</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Public vendor advisory or Project Zero / Anthropic Red post.</li>
        <li>AI tool named explicitly in the credit line or vendor disclosure.</li>
        <li>Reachable bug class (RCE, LPE, UAF, memory corruption) over hardening.</li>
        <li>Disclosed since the first AI-credited CVE shipped (Aug 2025).</li>
      </ul>

      <h2 className="text-lg font-semibold text-zinc-100 mt-8">What is intentionally excluded</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          The 268 sub-CVE findings in the Mythos Firefox 150 pass (defense-in-depth and
          hardening fixes). The aggregate counter on the home page captures them.
        </li>
        <li>The Linux kernel N-day demonstration set - CVE IDs are still under Glasswing rollout.</li>
        <li>
          AI-generated vulnerable code (eg the Vibe Security Radar tracking). Different
          problem, deserves its own scope.
        </li>
        <li>Unverifiable claims. Both flyingpenguin and rival.security have raised real
          concerns about training-data overlap on CVE-2026-4747. Source links are included
          so readers can judge for themselves.
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-zinc-100 mt-8">Glasswing partners</h2>
      <p>
        Project Glasswing launched 7 April 2026 with {AGGREGATE_STATS.glasswingPartners.length} founding
        partners and {AGGREGATE_STATS.glasswingCredits}: {AGGREGATE_STATS.glasswingPartners.join(", ")}.
        Partners get gated access to Mythos and to disclosed-but-unreleased exploit code.
      </p>

      <h2 className="text-lg font-semibold text-zinc-100 mt-8">Primary sources</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><a className="text-emerald-400 hover:underline" href="https://red.anthropic.com/2026/mythos-preview/">Anthropic Red - Claude Mythos Preview</a></li>
        <li><a className="text-emerald-400 hover:underline" href="https://www.mozilla.org/en-US/security/advisories/">Mozilla Foundation Security Advisories</a></li>
        <li><a className="text-emerald-400 hover:underline" href="https://www.freebsd.org/security/advisories/">FreeBSD security advisories</a></li>
        <li><a className="text-emerald-400 hover:underline" href="https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-our-big-sleep-agent-makes-big-leap">Google Cloud - Big Sleep</a></li>
        <li><a className="text-emerald-400 hover:underline" href="https://www.csoonline.com/article/4159617/behind-the-mythos-hype-glasswing-has-just-one-confirmed-cve.html">CSO Online - Glasswing CVE skepticism</a></li>
        <li><a className="text-emerald-400 hover:underline" href="https://www.schneier.com/blog/archives/2026/04/claude-mythos-has-found-271-zero-days-in-firefox.html">Schneier on Security</a></li>
      </ul>

      <h2 className="text-lg font-semibold text-zinc-100 mt-8">Contribute</h2>
      <p>
        New AI-credited CVE? Open an issue or PR on{" "}
        <a className="text-emerald-400 hover:underline" href="https://github.com/L8ton-crypto/cvescope">
          github.com/L8ton-crypto/cvescope
        </a>
        . Each entry must link to a vendor-side source with the AI credit visible.
      </p>

      <p className="text-zinc-500 text-xs pt-6 border-t border-zinc-800">
        <Link href="/" className="hover:text-zinc-300">
          &larr; Back to timeline
        </Link>
      </p>
    </div>
  );
}
