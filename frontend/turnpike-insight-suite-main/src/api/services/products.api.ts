import { request } from "@/api/client";
import type { DemoRequestCreate, MessageResponse, ProductResponse } from "@/types/api";

export const listProducts = () => request<ProductResponse[]>({ url: "/products/", method: "GET" });

export const requestDemo = (payload: DemoRequestCreate) =>
  request<MessageResponse>({ url: "/products/request-demo", method: "POST", data: payload });
