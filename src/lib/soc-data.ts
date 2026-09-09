export type Severity = "High" | "Medium" | "Low";
export type AlertStatus = "New" | "In Progress" | "Closed";

export interface SocAlert {
  id: string;
  time: string;
  title: string;
  sector: string;
  severity: Severity;
  status: AlertStatus;
  source: string;
  riskScore: number;
}

export const alerts: SocAlert[] = [
  {
    id: "INC-001",
    time: "10:28:12",
    title: "Suspicious login on Hospital server",
    sector: "Hospital",
    severity: "High",
    status: "In Progress",
    source: "192.168.1.50",
    riskScore: 91,
  },
  {
    id: "INC-002",
    time: "10:24:45",
    title: "Multiple failed logins from 192.168.1.50",
    sector: "Hospital",
    severity: "High",
    status: "New",
    source: "192.168.1.50",
    riskScore: 84,
  },
  {
    id: "INC-003",
    time: "10:21:05",
    title: "Phishing URL detected: bad-login.com",
    sector: "Bank",
    severity: "Medium",
    status: "In Progress",
    source: "10.0.0.23",
    riskScore: 63,
  },
  {
    id: "INC-004",
    time: "10:19:33",
    title: "Port scan detected from 10.0.0.23",
    sector: "Government",
    severity: "Medium",
    status: "New",
    source: "10.0.0.23",
    riskScore: 58,
  },
  {
    id: "INC-005",
    time: "10:15:48",
    title: "Unusual traffic to Bank server",
    sector: "Bank",
    severity: "Low",
    status: "Closed",
    source: "10.0.0.15",
    riskScore: 31,
  },
  {
    id: "INC-006",
    time: "10:12:09",
    title: "New device login detected",
    sector: "College",
    severity: "Low",
    status: "Closed",
    source: "192.168.1.20",
    riskScore: 22,
  },
];

export const metrics = [
  { label: "Total Incidents", value: "24", delta: "+12%", trend: "up" as const },
  { label: "Active Alerts", value: "8", delta: "+33%", trend: "up" as const },
  { label: "High Severity", value: "3", delta: "+50%", trend: "up" as const },
];

export const sectors = [
  { name: "Hospital", status: "Under Attack", share: 50 },
  { name: "Bank", status: "Secure", share: 25 },
  { name: "Government", status: "Secure", share: 15 },
  { name: "College", status: "Secure", share: 10 },
  { name: "Traffic System", status: "Secure", share: 0 },
  { name: "Utilities", status: "Secure", share: 0 },
];

export const trend = [22, 31, 26, 44, 38, 52, 41, 63, 49, 71, 58, 78];

export const severityBuckets = [
  { label: "High", count: 3, color: "var(--color-high)" },
  { label: "Medium", count: 4, color: "var(--color-medium)" },
  { label: "Low", count: 5, color: "var(--color-low)" },
];

export const incidentTimeline = [
  { time: "10:28:12", text: "Multiple failed login attempts started" },
  { time: "10:30:21", text: "Successful login from 192.168.1.50" },
  { time: "10:30:45", text: "Honeypot resource accessed" },
  { time: "10:32:03", text: "Lateral movement attempt to Bank subnet blocked" },
];

export const keyIndicators = [
  "15 failed login attempts in 4 minutes",
  "Login from unknown location (Tallinn, EE)",
  "Accessed honeypot resource",
  "Unusual login time (10:28 AM)",
];

export const severityStyles: Record<Severity, string> = {
  High: "bg-high/15 text-high border-high/40",
  Medium: "bg-medium/15 text-medium border-medium/40",
  Low: "bg-low/15 text-low border-low/40",
};

export const statusStyles: Record<AlertStatus, string> = {
  New: "bg-primary/15 text-primary border-primary/40",
  "In Progress": "bg-medium/15 text-medium border-medium/40",
  Closed: "bg-muted text-muted-foreground border-border",
};
