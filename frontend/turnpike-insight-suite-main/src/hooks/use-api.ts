import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiErrorShape } from "@/api/client";
import { listBlogs, createBlog, type BlogListParams } from "@/api/services/blogs.api";
import { listLeads, updateLeadStatus, type LeadListParams } from "@/api/services/leads.api";
import { listSubscribers } from "@/api/services/newsletter.api";
import { listProducts } from "@/api/services/products.api";
import {
  createService,
  deleteService,
  listServices,
  updateService,
  type ServiceListParams,
} from "@/api/services/services.api";
import {
  listCourses,
  listInstructorApplications,
  type CourseListParams,
  type InstructorApplicationParams,
} from "@/api/services/training.api";
import { queryKeys } from "@/constants/query-keys";
import type {
  BlogCreate,
  LeadResponse,
  LeadStatus,
  PageParams,
  ServiceCreate,
  ServiceUpdate,
} from "@/types/api";

const onError = (error: unknown) => {
  const err = error as ApiErrorShape;
  toast.error(err?.message ?? "Something went wrong");
};

/* ---------------------------------- reads --------------------------------- */

export const useServices = (params: ServiceListParams = {}) =>
  useQuery({ queryKey: queryKeys.services(params), queryFn: () => listServices(params) });

export const useProducts = () =>
  useQuery({ queryKey: queryKeys.products, queryFn: listProducts });

export const useLeads = (params: LeadListParams = {}) =>
  useQuery({ queryKey: queryKeys.leads(params), queryFn: () => listLeads(params) });

export const useCourses = (params: CourseListParams = {}) =>
  useQuery({ queryKey: queryKeys.courses(params), queryFn: () => listCourses(params) });

export const useInstructorApplications = (params: InstructorApplicationParams = {}) =>
  useQuery({
    queryKey: queryKeys.instructorApplications(params),
    queryFn: () => listInstructorApplications(params),
  });

export const useBlogs = (params: BlogListParams = {}) =>
  useQuery({ queryKey: queryKeys.blogs(params), queryFn: () => listBlogs(params) });

export const useSubscribers = (params: PageParams = {}) =>
  useQuery({ queryKey: queryKeys.subscribers(params), queryFn: () => listSubscribers(params) });

/* -------------------------------- mutations ------------------------------- */

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServiceCreate) => createService(payload),
    onSuccess: () => {
      toast.success("Service created");
      void qc.invalidateQueries({ queryKey: ["services"] });
    },
    onError,
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ServiceUpdate }) =>
      updateService(id, payload),
    onSuccess: () => {
      toast.success("Service updated");
      void qc.invalidateQueries({ queryKey: ["services"] });
    },
    onError,
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      toast.success("Service deleted");
      void qc.invalidateQueries({ queryKey: ["services"] });
    },
    onError,
  });
}

export function useUpdateLeadStatus(params: LeadListParams) {
  const qc = useQueryClient();
  const key = queryKeys.leads(params);

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) => updateLeadStatus(id, status),
    // Optimistic update for instant pipeline feedback.
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<LeadResponse[]>(key);
      qc.setQueryData<LeadResponse[]>(key, (old) =>
        old?.map((lead) => (lead._id === id ? { ...lead, status } : lead)),
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) qc.setQueryData(key, context.previous);
      onError(error);
    },
    onSuccess: () => toast.success("Lead status updated"),
    onSettled: () => void qc.invalidateQueries({ queryKey: ["leads"] }),
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlogCreate) => createBlog(payload),
    onSuccess: () => {
      toast.success("Article published");
      void qc.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError,
  });
}
