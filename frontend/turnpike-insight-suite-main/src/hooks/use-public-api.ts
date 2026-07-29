import { useMutation, useQuery } from "@tanstack/react-query";

import { getBlog, listBlogs } from "@/api/services/blogs.api";
import { bookCall, submitNeeds } from "@/api/services/leads.api";
import { subscribe } from "@/api/services/newsletter.api";
import { listProducts, requestDemo } from "@/api/services/products.api";
import { getService, listServices } from "@/api/services/services.api";
import { getCourse, listCourses } from "@/api/services/training.api";

export const usePublicServices = () =>
  useQuery({ queryKey: ["public", "services"], queryFn: () => listServices({ limit: 24 }) });

export const usePublicProducts = () =>
  useQuery({ queryKey: ["public", "products"], queryFn: () => listProducts() });

export const usePublicCourses = () =>
  useQuery({ queryKey: ["public", "courses"], queryFn: () => listCourses({ limit: 12 }) });

export const usePublicBlogs = () =>
  useQuery({ queryKey: ["public", "blogs"], queryFn: () => listBlogs({ limit: 6 }) });

export const usePublicService = (slug: string) =>
  useQuery({ queryKey: ["public", "service", slug], queryFn: () => getService(slug), enabled: !!slug });

export const usePublicCourse = (slug: string) =>
  useQuery({ queryKey: ["public", "course", slug], queryFn: () => getCourse(slug), enabled: !!slug });

export const usePublicBlog = (slug: string) =>
  useQuery({ queryKey: ["public", "blog", slug], queryFn: () => getBlog(slug), enabled: !!slug });

export const useBookCall = () =>
  useMutation({ mutationFn: (payload: Record<string, unknown>) => bookCall(payload) });

export const useSubmitNeeds = () =>
  useMutation({ mutationFn: (payload: Record<string, unknown>) => submitNeeds(payload) });

export const useRequestDemo = () =>
  useMutation({ mutationFn: (payload: Parameters<typeof requestDemo>[0]) => requestDemo(payload) });

export const useSubscribe = () =>
  useMutation({ mutationFn: (email: string) => subscribe(email) });
