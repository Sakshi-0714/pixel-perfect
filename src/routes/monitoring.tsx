import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, Sparkline } from "@/components/soc/Bits";
import { cityEvents, citySectors, trend } from "@/lib/soc-data";

export const Route = createFileRoute("/monitoring")({
  head: () => ({
    meta: [
      { title: "Live Monitoring — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Real-time network monitoring: traffic volume, sensor health, protocol mix and a streaming log of city-wide security events.",
      },
      { property: "og:title", content: "Live Monitoring — Sentinel X" },
      {
        property: "og:description",
        content: "Traffic, sensor health and a live stream of city security events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MonitoringPage,
});

const protocols = [
  { name: "HTTPS", share: 46 },
  { name: "DNS", share: 18 },
  { name: "SSH", share: 12 },
  { name: "MQTT", share: 14 },
  { name: "Other", share: 10 },
];

function MonitoringPage() {
  const totalTraffic = citySectors.reduce((n, s) => n + s.trafficMbps, 0);
  const online = citySectors.reduce((n, s) => n + s.sensorsOnline, 0);
  const totalSensors = citySectors.reduce((n, s) => n + s.sensorsTotal, 0);

  return (
    <AppShell title="Live Monitoring" subtitle="Network and sensor telemetry across the city">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Traffic", value: `${totalTraffic} Mbps` },
          { label: "Sensors Online", value: `${online}/${totalSensors}` },
          { label: "Events / min", value: "1,284" },
          { label: "Avg Latency", value: "38 ms" },
        ].map((m) => (
          <Panel key={m.label}>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-display text-2xl">{m.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Traffic Volume" className="lg:col-span-2">
          <Sparkline data={trend} />
        </Panel>
        <Panel title="Protocol Mix">
          <ul className="space-y-3">
            {protocols.map((p) => (
              <li key={p.name}>
                <div className="flex justify-between text-xs">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.share}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${p.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Sector Throughput">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Sector</th>
                  <th className="py-2 pr-3 font-medium">Traffic</th>
                  <th className="py-2 pr-3 font-medium">Sensors</th>
                  <th className="py-2 font-medium">Uptime</th>
                </tr>
              </thead>
              <tbody>
                {citySectors.map((s) => (
                  <tr key={s.name} className="border-b border-border/60">
                    <td className="py-2.5 pr-3">{s.name}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs">{s.trafficMbps} Mbps</td>
                    <td className="py-2.5 pr-3 font-mono text-xs">
                      {s.sensorsOnline}/{s.sensorsTotal}
                    </td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{s.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Event Stream">
          <ul className="space-y-2 font-mono text-[11px]">
            {cityEvents.map((e) => (
              <li key={e.time} className="rounded-md bg-surface-2 px-3 py-2">
                <span className="text-muted-foreground">{e.time}</span>{" "}
                <span className="text-primary">[{e.sector}]</span> {e.text}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
