import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel } from "@/components/soc/Bits";
import {
  cityEvents,
  cityInfrastructure,
  citySectors,
  sectorStatusStyles,
} from "@/lib/soc-data";

export const Route = createFileRoute("/smart-city")({
  head: () => ({
    meta: [
      { title: "Smart City Map — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "City-wide security view: sector risk scores, connected devices, sensor uptime and live infrastructure health across the smart city grid.",
      },
      { property: "og:title", content: "Smart City Map — Sentinel X" },
      {
        property: "og:description",
        content: "Sector risk scores, device counts and live infrastructure health.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmartCityPage,
});

function SmartCityPage() {
  const [selected, setSelected] = useState(citySectors[0].name);
  const sector = citySectors.find((s) => s.name === selected)!;

  return (
    <AppShell title="Smart City" subtitle="Live map of connected city infrastructure">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="City Grid" className="lg:col-span-2">
          <div className="grid-lines grid gap-3 rounded-md border border-border/60 p-4 sm:grid-cols-3">
            {citySectors.map((s) => {
              const active = s.name === selected;
              return (
                <button
                  key={s.name}
                  onClick={() => setSelected(s.name)}
                  className={`rounded-md border p-3 text-left transition-colors ${
                    sectorStatusStyles[s.status]
                  } ${active ? "glow-primary" : "hover:brightness-125"}`}
                >
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="mt-1 text-[11px]">{s.status}</p>
                  <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                    Risk {s.riskScore} · {s.devices} devices
                  </p>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title={`${sector.name} Details`}>
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${sectorStatusStyles[sector.status]}`}
          >
            {sector.status}
          </span>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Risk score", `${sector.riskScore}/100`],
              ["Connected devices", sector.devices],
              ["Sensors online", `${sector.sensorsOnline}/${sector.sensorsTotal}`],
              ["Traffic", `${sector.trafficMbps} Mbps`],
              ["Active alerts", sector.activeAlerts],
              ["Uptime", sector.uptime],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-mono text-xs">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-md bg-surface-2 p-3 text-xs text-muted-foreground">
            Last event: {sector.lastEvent}
          </p>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="City Infrastructure" className="lg:col-span-2">
          <ul className="space-y-3">
            {cityInfrastructure.map((i) => {
              const pct = Math.round((i.online / i.total) * 100);
              return (
                <li key={i.label}>
                  <div className="flex justify-between text-xs">
                    <span>{i.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {i.online}/{i.total} · {pct}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${pct > 97 ? "bg-safe" : pct > 92 ? "bg-medium" : "bg-high"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Live City Feed">
          <ul className="space-y-2">
            {cityEvents.map((e) => (
              <li key={e.time} className="rounded-md bg-surface-2 px-3 py-2 text-xs">
                <span className="font-mono text-[11px] text-muted-foreground">{e.time}</span>
                <span className="ml-2 text-primary">{e.sector}</span>
                <p className="mt-1 text-muted-foreground">{e.text}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
