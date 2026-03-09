import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Authentication temporarily disabled
  return NextResponse.json({ 
    user: null,
    message: "Authentication is currently disabled"
  });
}

