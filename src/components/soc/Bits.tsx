import type { ReactNode } from "react";
import { severityStyles, statusStyles, type AlertStatus, type Severity } from "@/lib/soc-data";

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel p-4 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && (
            <h2 className="font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}

export function StatusBadge({ status }: { status: AlertStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 90 - 5;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-28 w-full">
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill="var(--color-accent)"
        opacity="0.12"
      />
    </svg>
  );
}

export function Donut({
  segments,
  total,
}: {
  segments: { label: string; count: number; color: string }[];
  total: number;
}) {
  let offset = 0;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        {segments.map((s) => {
          const len = (s.count / total) * circumference;
          const dash = `${len} ${circumference - len}`;
          const el = (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={s.color}
              strokeWidth="12"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl">{total}</span>
        <span className="text-[11px] text-muted-foreground">Total</span>
      </div>
    </div>
  );
}

export function RiskGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 42;
  const dash = (score / 100) * circumference * 0.75;
  return (
    <div className="relative size-32">
      <svg viewBox="0 0 100 100" className="rotate-[135deg]">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--color-high)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl">{score}</span>
        <span className="text-[11px] text-muted-foreground">/100</span>
      </div>
    </div>
  );
}
