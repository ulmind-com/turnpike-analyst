import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/premium/page-header";
import { ApiUnavailable } from "@/components/premium/states";

export const Route = createFileRoute("/_authenticated/users")({
  head: () => ({
    meta: [
      { title: "User Management — Turnpike Analyst Console" },
      { name: "description", content: "Administer platform users and roles." },
    ],
  }),
  component: () => (
    <>
      <PageHeader
        title="User Management"
        description="Roles, access and account lifecycle for the Turnpike Analyst platform."
      />
      <ApiUnavailable
        feature="User administration"
        endpoint="GET /api/v1/users"
        note="The API currently exposes only /auth/register, /auth/login and /auth/me — there is no endpoint to list or modify other users."
      />
    </>
  ),
});
