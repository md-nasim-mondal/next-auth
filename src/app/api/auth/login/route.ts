import { connect } from "@/database/mongo.config";
import { loginSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/ErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const user = await User.findOne({ email: output.email });
    if (user) {
      const checkPassword = bcrypt.compareSync(output.password!, user.password);

      if (checkPassword) {
        return NextResponse.json(
          {
            status: 200,
            message: "User Logged In successfully!!",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            status: 401,
            errors: {
              message: "Please check your credentials!!",
            },
          },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      {
        status: 400,
        errors: {
          message: "Please check your credentials!.",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors?.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 500, errors: error?.messages },
        { status: 200 }
      );
    }
  }
}
