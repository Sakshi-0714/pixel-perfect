import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, SeverityBadge, StatusBadge } from "@/components/soc/Bits";
import { alerts } from "@/lib/soc-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "All Alerts — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Browse, filter and search every security alert raised across hospital, bank, government and college infrastructure.",
      },
      { property: "og:title", content: "All Alerts — Sentinel X" },
      {
        property: "og:description",
        content: "Filter smart city security alerts by severity, type and status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlertsPage,
});

const selectClass =
  "rounded-md border border-input bg-surface-2 px-3 py-2 text-xs outline-none focus:border-primary";

function AlertsPage() {
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      alerts.filter(
        (a) =>
          (severity === "All" || a.severity === severity) &&
          (status === "All" || a.status === status) &&
          (a.title + a.sector + a.id).toLowerCase().includes(query.toLowerCase()),
      ),
    [severity, status, query],
  );

  return (
    <AppShell title="All Alerts" subtitle="Every detection across the city network">
      <Panel>
        <div className="mb-4 flex flex-wrap gap-2">
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className={selectClass}
          >
            {["All", "High", "Medium", "Low"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectClass}
          >
            {["All", "New", "In Progress", "Closed"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <label className="ml-auto flex min-w-48 flex-1 items-center gap-2 rounded-md border border-input bg-surface-2 px-3 py-2 sm:max-w-64">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search alerts..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Time</th>
                <th className="py-2 pr-3 font-medium">Alert</th>
                <th className="py-2 pr-3 font-medium">Sector</th>
                <th className="py-2 pr-3 font-medium">Severity</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-border/60 hover:bg-surface-2">
                  <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{a.time}</td>
                  <td className="py-3 pr-3">{a.title}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{a.sector}</td>
                  <td className="py-3 pr-3">
                    <SeverityBadge severity={a.severity} />
                  </td>
                  <td className="py-3 pr-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="py-3">
                    <Link
                      to="/incidents"
                      className="rounded-md border border-border px-2 py-1 text-xs text-primary hover:bg-primary/10"
                    >
                      Investigate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Showing {rows.length} of {alerts.length} alerts
        </p>
      </Panel>
    </AppShell>
  );
}
