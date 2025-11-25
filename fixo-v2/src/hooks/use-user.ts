"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useUser() {
  const { data: session, status, update } = useSession();

  const user = useMemo(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      plan: session.user.plan || "FREE",
      monthlyAnalysesUsed: session.user.monthlyAnalysesUsed || 0,
      monthlyAnalysesLimit: session.user.monthlyAnalysesLimit || 3,
      canAnalyze:
        session.user.plan === "PLUS" ||
        session.user.plan === "PRO" ||
        session.user.plan === "LIFETIME" ||
        (session.user.monthlyAnalysesUsed || 0) < (session.user.monthlyAnalysesLimit || 3),
      isPremium:
        session.user.plan === "PLUS" ||
        session.user.plan === "PRO" ||
        session.user.plan === "LIFETIME",
    };
  }, [session]);

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    updateSession: update,
  };
}

export function useRequireAuth() {
  const { user, isLoading, isAuthenticated } = useUser();

  return {
    user,
    isLoading,
    isAuthenticated,
    isReady: !isLoading && isAuthenticated,
  };
}
