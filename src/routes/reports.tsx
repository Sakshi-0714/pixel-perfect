import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, Donut, Sparkline } from "@/components/soc/Bits";
import { citySectors, severityBuckets, trend } from "@/lib/soc-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Generate and download security reports: incident summaries, sector risk breakdowns and weekly trend analysis for the smart city.",
      },
      { property: "og:title", content: "Reports — Sentinel X" },
      {
        property: "og:description",
        content: "Incident summaries, sector risk breakdowns and weekly trends.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const saved = [
  { name: "Weekly Security Summary", period: "01–07 Sep 2026", size: "1.2 MB" },
  { name: "Hospital Sector Deep Dive", period: "August 2026", size: "820 KB" },
  { name: "Executive Risk Briefing", period: "Q3 2026", size: "460 KB" },
  { name: "Compliance Audit Export", period: "August 2026", size: "2.4 MB" },
];

function ReportsPage() {
  return (
    <AppShell title="Reports" subtitle="Summaries and exports for stakeholders">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Incident Trend" className="lg:col-span-2">
          <Sparkline data={trend} />
        </Panel>
        <Panel title="Severity Split">
          <div className="flex items-center gap-5">
            <Donut segments={severityBuckets} total={12} />
            <ul className="space-y-2 text-sm">
              {severityBuckets.map((s) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.label}
                  <span className="text-muted-foreground">({s.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Sector Risk Breakdown">
          <ul className="space-y-3">
            {citySectors.map((s) => (
              <li key={s.name}>
                <div className="flex justify-between text-xs">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.riskScore}/100</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${s.riskScore > 70 ? "bg-high" : s.riskScore > 45 ? "bg-medium" : "bg-safe"}`}
                    style={{ width: `${s.riskScore}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Saved Reports">
          <ul className="space-y-2">
            {saved.map((r) => (
              <li key={r.name} className="flex items-center gap-3 rounded-md bg-surface-2 px-3 py-2">
                <FileText className="size-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.period} · {r.size}
                  </p>
                </div>
                <button className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-primary hover:bg-primary/10">
                  <Download className="size-3" /> Export
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
