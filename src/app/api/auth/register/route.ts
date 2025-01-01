import { registerSchema } from "./../../../../validator/authSchema";
import { connect } from "@/database/mogo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, type NextRequest } from "next/server";

// For DB Connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
      const validator = vine.compile(registerSchema);
      validator.errorReporter = () => new ErrorReporter()
    const output = await validator.validate(body);
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    if (error instanceof errors?.E_VALIDATION_ERROR) {
      return NextResponse.json(error?.messages, { status: 200 });
    }
  }
}
