import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  Crosshair,
  Activity,
  Bell,
  FileWarning,
  Brain,
  ShieldCheck,
  FileText,
  Settings,
  ShieldHalf,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, enabled: true },
  { label: "Smart City", to: "/dashboard", icon: Building2, enabled: false },
  { label: "Attack Simulator", to: "/dashboard", icon: Crosshair, enabled: false },
  { label: "Monitoring", to: "/dashboard", icon: Activity, enabled: false },
  { label: "Alerts", to: "/alerts", icon: Bell, enabled: true },
  { label: "Incidents", to: "/incidents", icon: FileWarning, enabled: true },
  { label: "AI Analysis", to: "/incidents", icon: Brain, enabled: false },
  { label: "Response Center", to: "/incidents", icon: ShieldCheck, enabled: false },
  { label: "Reports", to: "/alerts", icon: FileText, enabled: false },
  { label: "Settings", to: "/dashboard", icon: Settings, enabled: false },
];

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface/70 p-4 backdrop-blur md:block">
        <Link to="/dashboard" className="mb-6 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
            <ShieldHalf className="size-4" />
          </span>
          <span className="font-display text-sm tracking-[0.2em] text-foreground">SENTINEL X</span>
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              activeProps={{ className: "bg-primary/15 text-primary" }}
              activeOptions={{ exact: true }}
            >
              <item.icon className="size-4" />
              {item.label}
              {!item.enabled && (
                <span className="ml-auto text-[10px] uppercase tracking-wide opacity-50">soon</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center gap-3 border-b border-border bg-surface/50 px-5 py-4 backdrop-blur">
          <div className="min-w-0">
            <h1 className="font-display text-lg tracking-wide text-foreground">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              10:30:45 AM
            </span>
            <span className="rounded-full border border-safe/40 bg-safe/10 px-3 py-1 text-xs text-safe">
              Lab mode
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
              SA
            </span>
          </div>
        </header>
        <main className="p-5">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-border bg-surface/95 py-2 backdrop-blur md:hidden">
        {[nav[0], nav[4], nav[5]].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex flex-col items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
