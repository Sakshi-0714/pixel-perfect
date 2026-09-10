import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, SeverityBadge, StatusBadge } from "@/components/soc/Bits";
import { alerts } from "@/lib/soc-data";

export const Route = createFileRoute("/response-center")({
  head: () => ({
    meta: [
      { title: "Response Center — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Coordinate containment: run response playbooks, block sources, isolate hosts and track every action taken on active incidents.",
      },
      { property: "og:title", content: "Response Center — Sentinel X" },
      {
        property: "og:description",
        content: "Run playbooks, contain threats and track response actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResponseCenterPage,
});

const playbooks = [
  { name: "Block Source IP", detail: "Add the attacking address to the perimeter deny list" },
  { name: "Isolate Host", detail: "Quarantine the affected machine from the sector VLAN" },
  { name: "Reset Credentials", detail: "Force password reset for the compromised account" },
  { name: "Notify Sector Owner", detail: "Alert the on-call contact for the affected sector" },
];

function ResponseCenterPage() {
  const [actions, setActions] = useState<string[]>([]);
  const active = alerts.filter((a) => a.status !== "Closed");

  function run(name: string) {
    const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setActions((a) => [`${time}  ${name} executed`, ...a]);
  }

  return (
    <AppShell title="Response Center" subtitle="Containment actions and playbooks">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Active Incidents" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">ID</th>
                  <th className="py-2 pr-3 font-medium">Incident</th>
                  <th className="py-2 pr-3 font-medium">Severity</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {active.map((a) => (
                  <tr key={a.id} className="border-b border-border/60">
                    <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                    <td className="py-3 pr-3">{a.title}</td>
                    <td className="py-3 pr-3">
                      <SeverityBadge severity={a.severity} />
                    </td>
                    <td className="py-3">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Playbooks">
          <ul className="space-y-2">
            {playbooks.map((p) => (
              <li key={p.name} className="rounded-md bg-surface-2 p-3">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{p.detail}</p>
                <button
                  onClick={() => run(p.name)}
                  className="mt-2 rounded-md border border-primary/50 px-2 py-1 text-xs text-primary hover:bg-primary/10"
                >
                  Run
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Action Log" className="mt-4">
        {actions.length ? (
          <ul className="space-y-2 font-mono text-[11px]">
            {actions.map((a) => (
              <li key={a} className="rounded-md bg-surface-2 px-3 py-2 text-muted-foreground">
                {a}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted-foreground">No response actions taken yet.</p>
        )}
      </Panel>
    </AppShell>
  );
}
