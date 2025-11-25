import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint is called by Vercel Cron at midnight daily
// It resets monthly usage counts on the first day of each month
export async function GET(request: NextRequest) {
  // Verify cron secret (set in Vercel dashboard)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const isFirstDayOfMonth = now.getDate() === 1;

    if (isFirstDayOfMonth) {
      // Reset monthly analyses for all FREE users
      const result = await prisma.user.updateMany({
        where: {
          plan: "FREE",
        },
        data: {
          monthlyAnalysesUsed: 0,
          analysesResetDate: now,
        },
      });

      console.log(`[Cron] Reset monthly analyses for ${result.count} users`);

      return NextResponse.json({
        success: true,
        message: `Reset monthly analyses for ${result.count} users`,
        timestamp: now.toISOString(),
      });
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
