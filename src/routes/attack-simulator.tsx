import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Square } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel } from "@/components/soc/Bits";
import { citySectors } from "@/lib/soc-data";

export const Route = createFileRoute("/attack-simulator")({
  head: () => ({
    meta: [
      { title: "Attack Simulator — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Run safe lab attack simulations — brute force, phishing, port scans and ransomware — against smart city sectors and watch detections fire.",
      },
      { property: "og:title", content: "Attack Simulator — Sentinel X" },
      {
        property: "og:description",
        content: "Safe lab simulations of brute force, phishing and scanning attacks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulatorPage,
});

const scenarios = [
  { id: "brute", name: "Brute Force Login", detail: "Repeated failed logins against a server", severity: "High" },
  { id: "phish", name: "Phishing Campaign", detail: "Malicious link delivered to staff mailboxes", severity: "Medium" },
  { id: "scan", name: "Port Scan", detail: "Sequential probe of exposed services", severity: "Medium" },
  { id: "ddos", name: "DDoS Flood", detail: "High-volume traffic burst on a gateway", severity: "High" },
  { id: "ransom", name: "Ransomware Drop", detail: "File encryption behaviour on an endpoint", severity: "High" },
  { id: "insider", name: "Insider Data Pull", detail: "Bulk record export outside working hours", severity: "Low" },
];

const inputClass =
  "rounded-md border border-input bg-surface-2 px-3 py-2 text-xs outline-none focus:border-primary";

function SimulatorPage() {
  const [scenario, setScenario] = useState(scenarios[0].id);
  const [target, setTarget] = useState(citySectors[0].name);
  const [intensity, setIntensity] = useState(4);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const current = scenarios.find((s) => s.id === scenario)!;

  function stamp() {
    return new Date().toLocaleTimeString("en-GB", { hour12: false });
  }

  function start() {
    setRunning(true);
    setLog([
      `${stamp()}  Simulation started — ${current.name} → ${target}`,
      `${stamp()}  Intensity level ${intensity}/10 · lab mode, no real traffic`,
      `${stamp()}  Sensors armed on ${target} subnet`,
      `${stamp()}  Detection engine raised a ${current.severity.toLowerCase()} severity alert`,
    ]);
  }

  function stop() {
    setRunning(false);
    setLog((l) => [...l, `${stamp()}  Simulation stopped and environment reset`]);
  }

  return (
    <AppShell title="Attack Simulator" subtitle="Safe lab scenarios — nothing leaves this environment">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Scenario" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`rounded-md border p-3 text-left transition-colors ${
                  s.id === scenario
                    ? "border-primary/60 bg-primary/10"
                    : "border-border bg-surface-2 hover:border-primary/40"
                }`}
              >
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.detail}</p>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Controls">
          <label className="block text-xs text-muted-foreground">Target sector</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className={`mt-1 w-full ${inputClass}`}
          >
            {citySectors.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>

          <label className="mt-4 block text-xs text-muted-foreground">
            Intensity: {intensity}/10
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-primary)]"
          />

          <button
            onClick={running ? stop : start}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
              running ? "bg-high text-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {running ? <Square className="size-4" /> : <Play className="size-4" />}
            {running ? "Stop Simulation" : "Launch Simulation"}
          </button>
        </Panel>
      </div>

      <Panel title="Simulation Log" className="mt-4">
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-md bg-surface-2 p-3 font-mono text-[11px] text-muted-foreground">
          {log.length ? log.join("\n") : "No simulation has been run yet."}
        </pre>
      </Panel>
    </AppShell>
  );
}
