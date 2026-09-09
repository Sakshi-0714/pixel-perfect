import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, ServerCog, UserCheck, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, SeverityBadge, StatusBadge, RiskGauge } from "@/components/soc/Bits";
import { alerts, incidentTimeline, keyIndicators } from "@/lib/soc-data";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incident Investigation — Sentinel X" },
      {
        name: "description",
        content:
          "Investigate INC-001: suspicious login on the hospital server with attack flow, timeline, evidence and AI risk analysis.",
      },
      { property: "og:title", content: "Incident Investigation — Sentinel X" },
      {
        property: "og:description",
        content: "Attack flow, timeline and AI-assisted risk scoring for an active incident.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IncidentPage,
});

const tabs = ["Overview", "Timeline", "Entities", "MITRE ATT&CK", "Evidence"] as const;

const flow = [
  { icon: KeyRound, title: "Multiple Failed Logins", meta: "192.168.1.50 · Unknown IP" },
  { icon: ServerCog, title: "Successful Login", meta: "Hospital Server 10.0.0.10" },
  { icon: UserCheck, title: "Honeypot Access", meta: "admin · User Account" },
];

function IncidentPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const incident = alerts[0]!;

  return (
    <AppShell title="Incident Investigation" subtitle={`${incident.id} · ${incident.sector}`}>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Panel>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
            </div>
            <h2 className="mt-2 font-display text-xl">{incident.title}</h2>

            <div className="mt-4 flex flex-wrap gap-2 border-b border-border pb-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                    tab === t
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Overview" && (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Incident ID", incident.id],
                  ["Sector", incident.sector],
                  ["Start Time", "23 May 2026, 10:28:12 AM"],
                  ["Source IP", incident.source],
                  ["Status", incident.status],
                  ["Assigned To", "Analyst Admin"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md bg-surface-2 px-3 py-2">
                    <dt className="text-[11px] text-muted-foreground">{k}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "Timeline" && (
              <ol className="mt-4 space-y-3 border-l border-border pl-4">
                {incidentTimeline.map((e) => (
                  <li key={e.time} className="relative">
                    <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-primary" />
                    <p className="font-mono text-[11px] text-muted-foreground">{e.time}</p>
                    <p className="text-sm">{e.text}</p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "Entities" && (
              <ul className="mt-4 space-y-2 text-sm">
                <li className="rounded-md bg-surface-2 px-3 py-2">Host · hospital-srv-01 (10.0.0.10)</li>
                <li className="rounded-md bg-surface-2 px-3 py-2">Account · admin</li>
                <li className="rounded-md bg-surface-2 px-3 py-2">IP · 192.168.1.50 (unknown)</li>
              </ul>
            )}

            {tab === "MITRE ATT&CK" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["T1110", "Brute Force"],
                  ["T1078", "Valid Accounts"],
                  ["T1021", "Remote Services"],
                ].map(([id, name]) => (
                  <div key={id} className="rounded-md border border-border bg-surface-2 p-3">
                    <p className="font-mono text-xs text-accent">{id}</p>
                    <p className="text-sm">{name}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Evidence" && (
              <ul className="mt-4 space-y-2 text-sm">
                <li className="rounded-md bg-surface-2 px-3 py-2">auth.log excerpt — 15 failed attempts</li>
                <li className="rounded-md bg-surface-2 px-3 py-2">Netflow capture — 10:28–10:33</li>
                <li className="rounded-md bg-surface-2 px-3 py-2">Honeypot access record</li>
              </ul>
            )}
          </Panel>

          <Panel title="Attack Flow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {flow.map((s, i) => (
                <div key={s.title} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-md border border-border bg-surface-2 p-3 text-center">
                    <s.icon className="mx-auto size-5 text-accent" />
                    <p className="mt-2 text-xs font-medium">{s.title}</p>
                    <p className="text-[11px] text-muted-foreground">{s.meta}</p>
                  </div>
                  {i < flow.length - 1 && (
                    <span className="hidden text-muted-foreground sm:block">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                View AI Analysis
              </button>
              <button className="rounded-md bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground hover:opacity-90">
                Take Action
              </button>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title="AI Risk Analysis">
            <div className="flex items-center gap-4">
              <RiskGauge score={incident.riskScore} />
              <div>
                <p className="text-sm font-semibold text-high">High Risk</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Confidence 92% · Powered by machine learning
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Multiple failed login attempts were followed by a successful login from an unusual IP
              address. The attacker then accessed a honeypot resource, which confirms malicious
              intent. This behavior is similar to known brute force activity.
            </p>
          </Panel>

          <Panel title="Key Indicators">
            <ul className="space-y-2 text-xs">
              {keyIndicators.map((k) => (
                <li key={k} className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-high" />
                  {k}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Recommended Actions">
            <ul className="space-y-2 text-xs">
              {[
                "Block IP 192.168.1.50",
                "Disable account: admin",
                "Monitor for lateral movement",
                "Review logs and strengthen authentication",
              ].map((r) => (
                <li key={r} className="rounded-md bg-surface-2 px-3 py-2">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">
              All actions are simulated in the lab environment.
            </p>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
