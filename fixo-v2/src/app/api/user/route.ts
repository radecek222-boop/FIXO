import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withRateLimit, RATE_LIMITS, getClientIdentifier } from "@/lib/rate-limit";
import { UserUpdateSchema, getFirstError } from "@/lib/validation/schemas";

// GET /api/user - Get current user data
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
        id: true,
        email: true,
        name: true,
        image: true,
        plan: true,
        monthlyAnalysesUsed: true,
        monthlyAnalysesLimit: true,
        totalRepairs: true,
        totalSaved: true,
        xp: true,
        level: true,
        currentStreak: true,
        longestStreak: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH /api/user - Update current user data
export async function PATCH(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = `userUpdate:${getClientIdentifier(request)}`;
    const rateLimitResult = withRateLimit(request, RATE_LIMITS.userUpdate, clientId);

    if (!rateLimitResult.success && rateLimitResult.response) {
      return rateLimitResult.response;
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Neautorizováno" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Neplatný JSON formát" },
        { status: 400 }
      );
    }

    // Zod validation
    const validation = UserUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: getFirstError(validation.error) },
        { status: 400 }
      );
    }

    const { name, image } = validation.data;

    // Only allow updating certain fields
    const updateData: { name?: string; image?: string | null } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Žádná platná pole k aktualizaci" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        plan: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/user - Delete current user account
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
