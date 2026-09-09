import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, SeverityBadge, Sparkline, Donut, RiskGauge } from "@/components/soc/Bits";
import { alerts, metrics, sectors, severityBuckets, trend } from "@/lib/soc-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "SOC Dashboard — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Live security operations dashboard: incident counts, city risk score, recent alerts and attacked sectors across smart city infrastructure.",
      },
      { property: "og:title", content: "SOC Dashboard — Sentinel X" },
      {
        property: "og:description",
        content: "Real-time smart city threat overview, risk score and recent alerts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Main SOC Dashboard" subtitle="Smart city security overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Panel key={m.label}>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-display text-3xl">{m.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-high">
              <ArrowUpRight className="size-3" /> {m.delta}
              <span className="text-muted-foreground">vs yesterday</span>
            </p>
          </Panel>
        ))}
        <Panel>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Risk Score</p>
              <p className="mt-2 font-display text-3xl">78/100</p>
              <p className="mt-1 text-xs text-high">High Risk</p>
            </div>
            <RiskGauge score={78} />
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Smart City Overview" className="lg:col-span-2">
          <div className="grid-lines grid gap-3 rounded-md border border-border/60 p-4 sm:grid-cols-3">
            {sectors.map((s) => {
              const attacked = s.status === "Under Attack";
              return (
                <div
                  key={s.name}
                  className={`rounded-md border p-3 ${
                    attacked
                      ? "border-high/50 bg-high/10 text-high"
                      : "border-safe/30 bg-safe/5 text-safe"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="mt-1 text-[11px]">{s.status}</p>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Recent Alerts"
          action={
            <Link to="/alerts" className="text-xs text-primary hover:underline">
              View All
            </Link>
          }
        >
          <ul className="space-y-2">
            {alerts.slice(0, 5).map((a) => (
              <li
                key={a.id}
                className="flex items-start gap-3 rounded-md bg-surface-2 px-3 py-2"
              >
                <span className="font-mono text-[11px] text-muted-foreground">{a.time}</span>
                <span className="min-w-0 flex-1 truncate text-xs">{a.title}</span>
                <SeverityBadge severity={a.severity} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Incident Trend (Last 7 Days)">
          <Sparkline data={trend} />
        </Panel>

        <Panel title="Alerts by Severity">
          <div className="flex items-center gap-5">
            <Donut segments={severityBuckets} total={12} />
            <ul className="space-y-2 text-sm">
              {severityBuckets.map((s) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.label}
                  <span className="text-muted-foreground">({s.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Top Attacked Sectors">
          <ul className="space-y-3">
            {sectors
              .filter((s) => s.share > 0)
              .map((s) => (
                <li key={s.name}>
                  <div className="flex justify-between text-xs">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.share}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-high"
                      style={{ width: `${s.share * 2}%` }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
