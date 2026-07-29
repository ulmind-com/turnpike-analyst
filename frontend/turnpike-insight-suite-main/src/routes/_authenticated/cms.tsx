import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/premium/page-header";
import { ApiUnavailable } from "@/components/premium/states";

export const Route = createFileRoute("/_authenticated/cms")({
  head: () => ({
    meta: [
      { title: "CMS Library — Turnpike Analyst Console" },
      { name: "description", content: "Media and page content library." },
    ],
  }),
  component: () => (
    <>
      <PageHeader
        title="CMS Library"
        description="Media assets and marketing page content."
      />
      <ApiUnavailable
        feature="Content library"
        endpoint="GET /api/v1/cms/assets"
        note="Blogs are the only content type the API serves today — manage them under Content › Blogs."
      />
    </>
  ),
});
