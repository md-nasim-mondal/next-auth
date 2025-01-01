import { connect } from "@/database/mogo.config";
import { NextResponse, type NextRequest } from "next/server";

// For DB Connection
connect();

export async function POST(request:NextRequest) {
    const body = await request.json();
    return NextResponse.json(body, {status: 200})
}