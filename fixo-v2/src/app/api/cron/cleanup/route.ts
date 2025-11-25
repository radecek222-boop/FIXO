import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetExpiredUsageLimits } from "@/lib/usage-limits";

// This endpoint is called by Vercel Cron at midnight daily
// It handles cleanup tasks and usage limit resets
export async function GET(request: NextRequest) {
  // Verify cron secret (set in Vercel dashboard)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Reset expired usage limits (users whose reset date has passed)
    const resetCount = await resetExpiredUsageLimits();
    if (resetCount > 0) {
      console.log(`[Cron] Reset usage limits for ${resetCount} users`);
    }

    // Daily cleanup tasks
    // Remove old verification tokens
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: now,
        },
      },
    });

    // Remove expired sessions
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        expires: {
          lt: now,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Daily cleanup completed",
      usageLimitsReset: resetCount,
      deletedTokens: deletedTokens.count,
      deletedSessions: deletedSessions.count,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[Cron] Cleanup error:", error);
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}
