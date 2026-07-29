import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/premium/page-header";
import { ApiUnavailable } from "@/components/premium/states";

export const Route = createFileRoute("/_authenticated/activity")({
  head: () => ({
    meta: [
      { title: "Activity Logs — Turnpike Analyst Console" },
      { name: "description", content: "Audit trail of administrative actions." },
    ],
  }),
  component: () => (
    <>
      <PageHeader
        title="Activity Logs"
        description="Audit trail of every administrative action across the platform."
      />
      <ApiUnavailable
        feature="Audit logging"
        endpoint="GET /api/v1/activity-logs"
        note="No audit endpoint exists yet, so nothing is displayed rather than showing fabricated history."
      />
    </>
  ),
});
