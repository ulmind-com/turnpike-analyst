import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GlassCard } from "@/components/premium/glass-card";
import { PageHeader } from "@/components/premium/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { API_BASE_URL, API_KEY, API_PREFIX, DEFAULT_PAGE_SIZE } from "@/constants/config";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Turnpike Analyst Console" },
      { name: "description", content: "Console appearance, motion and API connection settings." },
    ],
  }),
  component: SettingsPage,
});

const PREF_KEY = "turnpike.prefs.v1";

interface Prefs {
  dark: boolean;
  reducedMotion: boolean;
  smoothScroll: boolean;
  customCursor: boolean;
}

const DEFAULTS: Prefs = { dark: false, reducedMotion: false, smoothScroll: true, customCursor: true };

function SettingsPage() {
  const queryClient = useQueryClient();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (raw) setPrefs({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
    document.documentElement.classList.toggle("dark", prefs.dark);
    document.documentElement.dataset.reducedMotion = String(prefs.reducedMotion);
    document.documentElement.dataset.smoothScroll = String(prefs.smoothScroll);
    document.documentElement.dataset.customCursor = String(prefs.customCursor);
  }, [prefs]);

  const toggles: { key: keyof Prefs; label: string; hint: string }[] = [
    { key: "dark", label: "Dark interface", hint: "Deep aurora theme optimised for control rooms." },
    { key: "reducedMotion", label: "Reduced motion", hint: "Disables parallax, tilt and entrance animation." },
    { key: "smoothScroll", label: "Smooth scrolling", hint: "Lenis-powered inertia scrolling." },
    { key: "customCursor", label: "Magnetic cursor", hint: "Elastic cursor with magnetic targets." },
  ];

  return (
    <>
      <PageHeader
        title="Settings"
        description="Console preferences are stored in this browser. Backend configuration comes from environment variables."
      />

      <GlassCard className="p-6">
        <p className="font-medium">Appearance & motion</p>
        <div className="mt-4 space-y-3">
          {toggles.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </div>
              <Switch
                checked={prefs[item.key]}
                aria-label={item.label}
                onCheckedChange={(checked) => setPrefs((current) => ({ ...current, [item.key]: checked }))}
              />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="font-medium">API connection</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Base URL", value: API_BASE_URL },
            { label: "Path prefix", value: API_PREFIX },
            { label: "Gateway key header", value: API_KEY ? "x-api-key configured" : "Not configured" },
            { label: "Default page size", value: String(DEFAULT_PAGE_SIZE) },
          ].map((row) => (
            <div key={row.label} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{row.label}</dt>
              <dd className="mt-1 break-all font-mono text-xs">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              void queryClient.invalidateQueries();
              toast.success("All live data refetched");
            }}
          >
            Refetch all data
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              queryClient.clear();
              toast.success("Local query cache cleared");
            }}
          >
            Clear cache
          </Button>
        </div>
      </GlassCard>
    </>
  );
}
