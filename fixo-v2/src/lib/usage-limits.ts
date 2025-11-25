// ==========================================
// USAGE LIMITS MANAGEMENT
// ==========================================

import { prisma } from "@/lib/prisma";
import { getPlanAnalysesLimit } from "@/lib/payments";

export interface UsageStatus {
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
  canAnalyze: boolean;
  resetDate: Date | null;
}

/**
 * Get current usage status for a user
 */
export async function getUserUsageStatus(userId: string): Promise<UsageStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      monthlyAnalysesUsed: true,
      monthlyAnalysesLimit: true,
      analysesResetDate: true,
    },
  });

  if (!user) {
    return {
      used: 0,
      limit: 3,
      remaining: 3,
      unlimited: false,
      canAnalyze: true,
      resetDate: null,
    };
  }

  const limit = getPlanAnalysesLimit(user.plan);
  const unlimited = limit === -1;
  const used = user.monthlyAnalysesUsed;
  const remaining = unlimited ? Infinity : Math.max(0, limit - used);
  const canAnalyze = unlimited || remaining > 0;

  return {
    used,
    limit: unlimited ? -1 : limit,
    remaining: unlimited ? -1 : remaining,
    unlimited,
    canAnalyze,
    resetDate: user.analysesResetDate,
  };
}

/**
 * Check if user can perform an analysis
 */
export async function canUserAnalyze(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  status: UsageStatus;
}> {
  const status = await getUserUsageStatus(userId);

  if (!status.canAnalyze) {
    return {
      allowed: false,
      reason: `Dosáhli jste měsíčního limitu ${status.limit} analýz. Upgradujte váš plán pro neomezené analýzy.`,
      status,
    };
  }

  return { allowed: true, status };
}

/**
 * Increment user's analysis count
 * Should be called after successful analysis
 */
export async function incrementAnalysisCount(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      analysesResetDate: true,
      plan: true,
    },
  });

  if (!user) return;

  // Check if we need to reset the counter (new month)
  const now = new Date();
  const resetDate = user.analysesResetDate;
  const shouldReset = !resetDate || resetDate <= now;

  if (shouldReset) {
    // Calculate next reset date (first day of next month)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    await prisma.user.update({
      where: { id: userId },
      data: {
        monthlyAnalysesUsed: 1, // Start fresh with 1
        analysesResetDate: nextMonth,
      },
    });
  } else {
    // Just increment the counter
    await prisma.user.update({
      where: { id: userId },
      data: {
        monthlyAnalysesUsed: { increment: 1 },
      },
    });
  }
}

/**
 * Reset usage counters for users (called by cron job)
 */
export async function resetExpiredUsageLimits(): Promise<number> {
  const now = new Date();

  const result = await prisma.user.updateMany({
    where: {
      analysesResetDate: { lte: now },
    },
    data: {
      monthlyAnalysesUsed: 0,
      analysesResetDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
    },
  });

  return result.count;
}

/**
 * Check if a plan upgrade would give more analyses
 */
export function wouldUpgradeHelp(
  currentPlan: string,
  targetPlan: string
): boolean {
  const currentLimit = getPlanAnalysesLimit(currentPlan as "FREE" | "PLUS" | "PRO" | "LIFETIME");
  const targetLimit = getPlanAnalysesLimit(targetPlan as "FREE" | "PLUS" | "PRO" | "LIFETIME");

  // If target is unlimited and current is not, upgrade helps
  if (targetLimit === -1 && currentLimit !== -1) return true;

  // If both are limited, check if target is higher
  if (currentLimit !== -1 && targetLimit !== -1) {
    return targetLimit > currentLimit;
  }

  return false;
}
