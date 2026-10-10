import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "UP",
      timestamp: new Date().toISOString(),
      platform: "Academics Pro SaaS",
      version: "1.0.0",
      services: {
        frontend: "HEALTHY",
        gateway: "CONNECTED",
        tenancy: "ISOLATED",
      },
    },
    { status: 200 }
  );
}
