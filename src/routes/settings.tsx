import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel } from "@/components/soc/Bits";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Sentinel X Smart City Defense" },
      {
        name: "description",
        content:
          "Configure Sentinel X: analyst profile, alert notifications, detection thresholds and lab environment preferences.",
      },
      { property: "og:title", content: "Settings — Sentinel X" },
      {
        property: "og:description",
        content: "Profile, notifications, detection thresholds and lab preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const inputClass =
  "w-full rounded-md border border-input bg-surface-2 px-3 py-2 text-xs outline-none focus:border-primary";

function Toggle({ label, detail, initial }: { label: string; detail: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <li className="flex items-center gap-3 rounded-md bg-surface-2 px-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>
        <p className="text-[11px] text-muted-foreground">{detail}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        aria-label={label}
        className={`h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`block size-4 rounded-full bg-foreground transition-transform ${on ? "translate-x-4" : ""}`}
        />
      </button>
    </li>
  );
}

function SettingsPage() {
  const [threshold, setThreshold] = useState(70);

  return (
    <AppShell title="Settings" subtitle="Preferences for your analyst workspace">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Analyst Profile">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Full name</label>
              <input className={`mt-1 ${inputClass}`} defaultValue="Sakshi Analyst" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input className={`mt-1 ${inputClass}`} defaultValue="analyst@sentinelx.city" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Role</label>
              <select className={`mt-1 ${inputClass}`} defaultValue="SOC Analyst">
                {["SOC Analyst", "Incident Responder", "SOC Manager", "Observer"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        <Panel title="Notifications">
          <ul className="space-y-2">
            <Toggle label="High severity alerts" detail="Notify immediately" initial />
            <Toggle label="Medium severity alerts" detail="Batched every 15 minutes" initial />
            <Toggle label="Daily digest email" detail="Summary at 08:00" initial={false} />
            <Toggle label="Simulation results" detail="Notify when a lab run finishes" initial />
          </ul>
        </Panel>

        <Panel title="Detection">
          <label className="text-xs text-muted-foreground">
            Alert when risk score exceeds: {threshold}
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-primary)]"
          />
          <ul className="mt-3 space-y-2">
            <Toggle label="Auto-close low severity" detail="After 24 hours with no activity" initial={false} />
            <Toggle label="Correlate related alerts" detail="Group alerts sharing a source" initial />
          </ul>
        </Panel>

        <Panel title="Environment">
          <ul className="space-y-2">
            <Toggle label="Lab mode" detail="Simulations never touch real systems" initial />
            <Toggle label="Show sample data" detail="Populate screens with demo incidents" initial />
          </ul>
          <button className="mt-4 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            Save changes
          </button>
        </Panel>
      </div>
    </AppShell>
  );
}
