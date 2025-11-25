import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/stats - Get user statistics
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        totalRepairs: true,
        totalSaved: true,
        xp: true,
        level: true,
        currentStreak: true,
        longestStreak: true,
        monthlyAnalysesUsed: true,
        monthlyAnalysesLimit: true,
        plan: true,
        _count: {
          select: {
            repairs: true,
            achievements: true,
            savedGuides: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate additional stats
    const repairsByStatus = await prisma.repairHistory.groupBy({
      by: ["status"],
      where: { userId: session.user.id },
      _count: true,
    });

    const recentRepairs = await prisma.repairHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        startedAt: true,
        completedAt: true,
        savedAmount: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalRepairs: user.totalRepairs,
          totalSaved: user.totalSaved,
          xp: user.xp,
          level: user.level,
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
        },
        usage: {
          monthlyAnalysesUsed: user.monthlyAnalysesUsed,
          monthlyAnalysesLimit: user.monthlyAnalysesLimit,
          plan: user.plan,
        },
        counts: {
          repairs: user._count.repairs,
          achievements: user._count.achievements,
          savedGuides: user._count.savedGuides,
        },
        repairsByStatus: repairsByStatus.reduce(
          (acc, item) => ({
            ...acc,
            [item.status]: item._count,
          }),
          {}
        ),
        recentRepairs,
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
