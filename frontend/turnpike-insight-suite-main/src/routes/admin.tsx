import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useSession } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  // The session lives in browser storage, so the gate runs client-side only.
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticated, hydrated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      void navigate({ to: "/login", replace: true });
    }
  }, [hydrated, isAuthenticated, navigate]);

  if (!hydrated || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
