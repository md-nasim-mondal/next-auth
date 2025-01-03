import { registerSchema } from "./../../../../validator/authSchema";
import { connect } from "@/database/mogo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

// For DB Connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    //   Check is email already exist
    const user = await User.findOne({ email: output.email });

    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email:
              "Email is already taken!. Please try again with another email!",
          },
        },
        { status: 200 }
      );
    } else {
      //* Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output?.password, salt);
      await User.create(output);
      return NextResponse.json(
        { status: 200, message: "Account created successfully. Please login to your account." },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors?.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error?.messages },
        { status: 200 }
      );
    }
  }
}
