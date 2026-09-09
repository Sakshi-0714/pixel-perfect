import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldHalf, Lock, User } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In — Sentinel X Smart City Cyber Defense" },
      {
        name: "description",
        content:
          "Sign in to Sentinel X, the smart city cyber defense platform for monitoring alerts, incidents and city infrastructure risk.",
      },
      { property: "og:title", content: "Sign In — Sentinel X" },
      {
        property: "og:description",
        content: "Secure access to the Sentinel X smart city security operations center.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="grid-lines panel w-full max-w-sm p-7 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/20 text-primary glow-primary">
          <ShieldHalf className="size-8" />
        </div>
        <h1 className="mt-5 font-display text-2xl tracking-[0.16em]">SENTINEL X</h1>
        <p className="mt-1 text-xs tracking-wide text-muted-foreground">
          Smart City Cyber Defense
        </p>

        <form
          className="mt-7 space-y-3 text-left"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
        >
          <p className="text-center text-sm text-muted-foreground">Sign in to continue</p>
          <label className="flex items-center gap-2 rounded-md border border-input bg-surface-2 px-3 py-2">
            <User className="size-4 text-muted-foreground" />
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username or Email"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center gap-2 rounded-md border border-input bg-surface-2 px-3 py-2">
            <Lock className="size-4 text-muted-foreground" />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--color-primary)]" /> Remember me
            </label>
            <span className="text-primary">Forgot Password?</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="w-full rounded-md border border-border bg-surface-2 py-2 text-sm transition-colors hover:bg-surface"
          >
            Demo Access
          </button>
        </form>

        <p className="mt-6 text-[11px] text-muted-foreground">
          Protecting the digital future of our smart city
        </p>
      </div>
    </div>
  );
}
