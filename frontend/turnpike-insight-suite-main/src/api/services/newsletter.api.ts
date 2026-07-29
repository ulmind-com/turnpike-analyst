import { request } from "@/api/client";
import type { MessageResponse, NewsletterResponse, PageParams } from "@/types/api";

export const listSubscribers = (params: PageParams = {}) =>
  request<NewsletterResponse[]>({ url: "/newsletter/subscribers", method: "GET", params });

export const subscribe = (email: string) =>
  request<MessageResponse>({ url: "/newsletter/subscribe", method: "POST", data: { email } });
