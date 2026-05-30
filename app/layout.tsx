import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "CVEScope - AI-discovered CVE timeline",
  description:
    "Timeline of publicly disclosed CVEs and bugs credited to AI assistance since Anthropic Claude Mythos. Vendor, severity, days-to-patch, Glasswing partners.",
  metadataBase: new URL("https://cvescope.vercel.app"),
  openGraph: {
    title: "CVEScope - AI-discovered CVE timeline",
    description: "Track which 2025-2026 CVEs were found by AI agents, and how vendors responded.",
    url: "https://cvescope.vercel.app",
    siteName: "CVEScope",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0b] text-zinc-200">
        <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-emerald-400 font-mono text-sm tracking-tight group-hover:text-emerald-300">
                {"{"}cve{"}"}
              </span>
              <span className="font-semibold tracking-tight">CVEScope</span>
              <span className="hidden sm:inline text-xs text-zinc-500 ml-2">
                AI-discovered CVE timeline
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-zinc-300 hover:text-white">
                Timeline
              </Link>
              <Link href="/about" className="text-zinc-400 hover:text-white">
                About
              </Link>
              <a
                href="https://github.com/L8ton-crypto/cvescope"
                className="text-zinc-500 hover:text-white"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">{children}</main>
        <footer className="border-t border-zinc-800/80 mt-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-xs text-zinc-500 flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>
              Curated from public vendor advisories. Not affiliated with Anthropic, Mozilla,
              Apple, Google, or the Linux Foundation.
            </span>
            <span>
              Maintained by{" "}
              <a className="hover:text-zinc-300" href="https://github.com/L8ton-crypto">
                L8
              </a>
            </span>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
