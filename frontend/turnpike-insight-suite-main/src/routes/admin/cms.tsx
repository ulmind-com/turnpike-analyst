import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/premium/page-header";
import { GlassCard } from "@/components/premium/glass-card";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/premium/states";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAssets } from "@/hooks/use-api";
import { describeError } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin/cms")({
  head: () => ({
    meta: [
      { title: "CMS Library — Turnpike Analyst Console" },
      { name: "description", content: "Media and page content library." },
    ],
  }),
  component: CmsPage,
});

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function CmsPage() {
  const query = useAssets();

  return (
    <>
      <PageHeader
        title="CMS Library"
        description="Media assets and marketing page content."
      />

      {query.isLoading ? (
        <CardSkeleton />
      ) : query.error ? (
        <GlassCard interactive={false}>
          <ErrorState message={describeError(query.error)} onRetry={() => void query.refetch()} />
        </GlassCard>
      ) : !query.data?.length ? (
        <GlassCard interactive={false}>
          <EmptyState title="No assets found" />
        </GlassCard>
      ) : (
        <GlassCard interactive={false} className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {query.data.map((asset) => (
                <TableRow key={asset._id}>
                  <TableCell className="font-medium">
                    <a href={asset.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      {asset.filename}
                    </a>
                  </TableCell>
                  <TableCell>{asset.content_type}</TableCell>
                  <TableCell className="text-muted-foreground">{formatBytes(asset.size_bytes)}</TableCell>
                  <TableCell>{asset.uploaded_by}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(asset.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GlassCard>
      )}
    </>
  );
}
