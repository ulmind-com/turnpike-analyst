import { apiClient, request } from "@/api/client";
import type { LoginResponse, Token, UserCreate, UserResponse, UserUpdate } from "@/types/api";

/** POST /auth/login — OAuth2 password flow (form-encoded). */
export async function login(email: string, password: string): Promise<LoginResponse> {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);
  body.set("grant_type", "password");

  const { data } = await apiClient.post<LoginResponse>("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
}

export const loginWithGoogle = (firebase_token: string) =>
  request<LoginResponse>({ url: "/auth/google", method: "POST", data: { firebase_token } });

export const register = (payload: UserCreate) =>
  request<UserResponse>({ url: "/auth/register", method: "POST", data: payload });

export const refreshToken = (refresh_token: string) =>
  request<Token>({ url: "/auth/refresh-token", method: "POST", data: { refresh_token } });

export const getMe = () => request<UserResponse>({ url: "/auth/me", method: "GET" });

export const updateMe = (payload: Partial<UserUpdate>) => request<UserResponse>({ url: "/auth/me", method: "PATCH", data: payload });

