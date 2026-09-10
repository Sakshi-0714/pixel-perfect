import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, SeverityBadge } from "@/components/soc/Bits";
import { alerts, keyIndicators } from "@/lib/soc-data";

export const Route = createFileRoute("/ai-analysis")({
  head: () => ({
    meta: [
      { title: "AI Analysis — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "AI-assisted triage: plain-language incident summaries, confidence scores, key indicators and recommended next actions for analysts.",
      },
      { property: "og:title", content: "AI Analysis — Sentinel X" },
      {
        property: "og:description",
        content: "Plain-language incident summaries, confidence scores and recommended actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiAnalysisPage,
});

const recommendations = [
  "Disable the compromised account and force a password reset",
  "Block 192.168.1.50 at the perimeter firewall",
  "Isolate the patient records server from the hospital VLAN",
  "Review access logs for the last 24 hours on adjacent hosts",
];

function AiAnalysisPage() {
  const focus = alerts[0];

  return (
    <AppShell title="AI Analysis" subtitle="Machine-assisted triage and explanation">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Incident Summary" className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">{focus.id}</span>
            <h2 className="text-sm font-semibold">{focus.title}</h2>
            <SeverityBadge severity={focus.severity} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An account on the hospital patient records server was accessed from{" "}
            {focus.source} after 15 failed attempts in four minutes. The successful login came
            from an unfamiliar location and immediately touched a honeypot resource, which
            genuine staff never open. The pattern matches credential stuffing followed by
            hands-on-keyboard exploration.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Confidence", "94%"],
              ["Risk score", `${focus.riskScore}/100`],
              ["Likely intent", "Data theft"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md bg-surface-2 p-3">
                <p className="text-[11px] text-muted-foreground">{k}</p>
                <p className="mt-1 font-display text-lg">{v}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Key Indicators">
          <ul className="space-y-2 text-xs">
            {keyIndicators.map((k) => (
              <li key={k} className="rounded-md bg-surface-2 px-3 py-2 text-muted-foreground">
                {k}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Recommended Actions">
          <ol className="space-y-2 text-sm">
            {recommendations.map((r, i) => (
              <li key={r} className="flex gap-3 rounded-md bg-surface-2 px-3 py-2">
                <span className="font-mono text-xs text-primary">{i + 1}</span>
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Similar Past Incidents">
          <ul className="space-y-2">
            {alerts.slice(1, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-3 rounded-md bg-surface-2 px-3 py-2">
                <span className="font-mono text-[11px] text-muted-foreground">{a.id}</span>
                <span className="min-w-0 flex-1 truncate text-xs">{a.title}</span>
                <SeverityBadge severity={a.severity} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
