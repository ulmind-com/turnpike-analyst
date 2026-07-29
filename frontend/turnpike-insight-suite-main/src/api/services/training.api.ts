import { request } from "@/api/client";
import type {
  ApplicationStatus,
  CourseCategory,
  CourseLevel,
  CourseResponse,
  InstructorApplicationResponse,
  PageParams,
} from "@/types/api";

export interface CourseListParams extends PageParams {
  category?: CourseCategory;
  level?: CourseLevel;
}

export const listCourses = (params: CourseListParams = {}) =>
  request<CourseResponse[]>({ url: "/training/courses", method: "GET", params });

export const getCourse = (slug: string) =>
  request<CourseResponse>({ url: `/training/courses/${slug}`, method: "GET" });

export interface InstructorApplicationParams extends PageParams {
  status?: ApplicationStatus;
}

export const listInstructorApplications = (params: InstructorApplicationParams = {}) =>
  request<InstructorApplicationResponse[]>({
    url: "/training/instructor-applications",
    method: "GET",
    params,
  });

export const becomeInstructor = (payload: Record<string, unknown>) =>
  request({ url: "/training/become-instructor", method: "POST", data: payload });
