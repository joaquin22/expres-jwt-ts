import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { loginUserType, registerUserType } from "../schemas/user.schema";
import {
  findUseByEmailService,
  registerUserService,
} from "../services/auth.services";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateTokens } from "../utils/jwt";

export const registerUserController = async (
  request: Request<{}, {}, registerUserType>,
  response: Response
) => {
  const { body } = request;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  try {
    const user = await registerUserService({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email.toLowerCase(),
      password: hashedPassword,
    });
    return response.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return response.status(400).json({
          message: "User already exists",
        });
      }
    }
  }
};

export const loginUserController = async (
  request: Request<{}, {}, loginUserType>,
  response: Response
) => {
  const { email, password } = request.body;
  const user = await findUseByEmailService(email);
  if (!user) {
    return response.status(400).json({
      status: "fail",
      message: "Invalid Email",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return response.status(400).json({
      status: "fail",
      message: "Invalid password",
    });
  }
  const { access_token, refresh_token } = generateTokens({
    user: user.id,
  });

  response.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: true,
    path: "/api/auth",
  });

  return response.status(200).json({
    status: "success",
    data: {
      access_token: access_token,
      refresh_token: refresh_token,
    },
  });
};

export const refreshToken = (request: Request, response: Response) => {
  const refreshToken = request.cookies.refresh_token;
  console.log(refreshToken);
};
