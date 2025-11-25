import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    environment: process.env.NODE_ENV,
  });
}
