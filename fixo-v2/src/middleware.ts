import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom headers if needed
    const response = NextResponse.next();

    // Security headers are added in next.config.js
    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes - always accessible
        const publicRoutes = [
          "/",
          "/pricing",
          "/about",
          "/contact",
          "/terms",
          "/privacy",
          "/auth/login",
          "/auth/error",
        ];

        // Check if current path is public
        if (publicRoutes.includes(path)) {
          return true;
        }

        // API routes that don't require auth
        if (path.startsWith("/api/health") || path.startsWith("/api/repairs")) {
          return true;
        }

        // Auth API routes
        if (path.startsWith("/api/auth")) {
          return true;
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
