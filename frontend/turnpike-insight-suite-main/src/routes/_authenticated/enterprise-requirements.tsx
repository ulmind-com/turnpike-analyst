import { createFileRoute } from "@tanstack/react-router";

import { LeadsWorkspace } from "@/features/leads/leads-workspace";

export const Route = createFileRoute("/_authenticated/enterprise-requirements")({
  head: () => ({
    meta: [
      { title: "Enterprise Requirements — Turnpike Analyst Console" },
      { name: "description", content: "Detailed enterprise requirement submissions." },
    ],
  }),
  component: () => (
    <LeadsWorkspace
      type="REQUIREMENT_FORM"
      title="Enterprise Requirements"
      description="Structured requirement briefs submitted by enterprise buyers."
    />
  ),
});
