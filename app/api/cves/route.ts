import { NextResponse } from "next/server";
import { CVES, AGGREGATE_STATS } from "@/lib/cves";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    { count: CVES.length, aggregate: AGGREGATE_STATS, items: CVES },
    {
      headers: {
        "cache-control": "public, max-age=300, s-maxage=600",
      },
    }
  );
}
