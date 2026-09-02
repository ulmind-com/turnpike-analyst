import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "sonner";

import type { ApiErrorShape } from "@/api/client";
import { getMe, login as loginRequest, loginWithGoogle, updateMe } from "@/api/services/auth.api";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { queryKeys } from "@/constants/query-keys";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types/api";
import { usePrefs } from "./use-prefs";

export function useSession() {
  const { accessToken, user, hydrated } = useAuthStore();

  const query = useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const data = await getMe();
      if ((data as any).theme) {
        usePrefs.getState().setPref("dark", (data as any).theme === "dark");
      }
      return data;
    },
    enabled: !!accessToken,
    staleTime: 5 * 60_000,
    retry: false,
  });

  return {
    user: query.data ?? user,
    isAuthenticated: !!accessToken,
    isLoading: !hydrated || (!!accessToken && query.isLoading),
    hydrated,
  };
}

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useCallback(
    async (email: string, password: string) => {
      const data = await loginRequest(email, password);
      setSession({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
      return data;
    },
    [setSession],
  );
}

export function useGoogleLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    const data = await loginWithGoogle(token);
    
    setSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: data.user,
    });
    return data;
  }, [setSession]);
}

export function useLogout() {
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  return useCallback(() => {
    // The API exposes no logout endpoint — the session is terminated by
    // discarding both tokens client-side.
    clear();
    toast.success("Signed out");
    void navigate({ to: "/login", replace: true });
  }, [clear, navigate]);
}

export function useHasRole(roles: UserRole[]) {
  const { user } = useSession();
  return !!user?.role && roles.includes(user.role);
}

export const describeError = (error: unknown) =>
  (error as ApiErrorShape)?.message ?? "Unexpected error";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      // toast.success("Profile updated"); // Silent update
    },
  });
}

