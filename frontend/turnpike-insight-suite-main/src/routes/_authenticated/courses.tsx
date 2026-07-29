import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DataGrid, type DataGridColumn } from "@/components/premium/data-grid";
import { PageHeader } from "@/components/premium/page-header";
import { StatusBadge } from "@/components/premium/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import { useCourses } from "@/hooks/use-api";
import { describeError } from "@/hooks/use-auth";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  type CourseCategory,
  type CourseLevel,
  type CourseResponse,
} from "@/types/api";
import { formatCurrency, titleCase } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/courses")({
  head: () => ({
    meta: [
      { title: "Training Courses — Turnpike Analyst Console" },
      { name: "description", content: "Catalog of ECM, cloud and AI training courses." },
      { property: "og:title", content: "Training Courses — Turnpike Analyst Console" },
      { property: "og:description", content: "Catalog of ECM, cloud and AI training courses." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [category, setCategory] = useState<CourseCategory | "ALL">("ALL");
  const [level, setLevel] = useState<CourseLevel | "ALL">("ALL");

  const query = useCourses({
    skip: page * pageSize,
    limit: pageSize,
    ...(category === "ALL" ? {} : { category }),
    ...(level === "ALL" ? {} : { level }),
  });

  const columns: DataGridColumn<CourseResponse>[] = [
    {
      key: "title",
      header: "Course",
      sortable: true,
      value: (row) => `${row.title} ${row.slug}`,
      cell: (row) => (
        <div className="min-w-0">
          <p className="font-medium">{row.title}</p>
          <p className="truncate text-xs text-muted-foreground">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      value: (row) => row.category,
      cell: (row) => <span className="text-xs">{titleCase(row.category)}</span>,
    },
    {
      key: "level",
      header: "Level",
      sortable: true,
      value: (row) => row.level,
      cell: (row) => <StatusBadge value={row.level} />,
    },
    {
      key: "duration_hours",
      header: "Duration",
      sortable: true,
      value: (row) => row.duration_hours,
      cell: (row) => <span className="text-xs">{row.duration_hours} h</span>,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      value: (row) => row.price,
      cell: (row) => <span className="font-medium tabular-nums">{formatCurrency(row.price)}</span>,
    },
    {
      key: "curriculum",
      header: "Modules",
      value: (row) => row.curriculum?.length ?? 0,
      cell: (row) => <span className="text-xs">{row.curriculum?.length ?? 0}</span>,
    },
    {
      key: "is_published",
      header: "Status",
      sortable: true,
      value: (row) => (row.is_published ? "Published" : "Draft"),
      cell: (row) => <StatusBadge value={row.is_published ? "ACTIVE" : "INACTIVE"} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Training Courses"
        description="Every course published through the Turnpike training programme."
      />

      <DataGrid
        rows={query.data}
        columns={columns}
        getRowId={(row) => row._id ?? row.slug}
        isLoading={query.isLoading}
        error={query.error ? { message: describeError(query.error) } : null}
        onRetry={() => void query.refetch()}
        searchPlaceholder="Search courses…"
        exportName="turnpike-courses"
        selectable={false}
        emptyTitle="No courses match these filters"
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(0);
        }}
        filters={
          <>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value as CourseCategory | "ALL");
                setPage(0);
              }}
            >
              <SelectTrigger className="h-9 w-48" aria-label="Filter by category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All categories</SelectItem>
                {COURSE_CATEGORIES.map((value) => (
                  <SelectItem key={value} value={value}>
                    {titleCase(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={level}
              onValueChange={(value) => {
                setLevel(value as CourseLevel | "ALL");
                setPage(0);
              }}
            >
              <SelectTrigger className="h-9 w-40" aria-label="Filter by level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All levels</SelectItem>
                {COURSE_LEVELS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {titleCase(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        }
      />
    </>
  );
}
