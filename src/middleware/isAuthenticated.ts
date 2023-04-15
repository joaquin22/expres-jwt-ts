import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(404).json({ message: "No Token" });
    }
    access_token = authorization.split(" ")[1];
    const decoded = verifyJwt(access_token, "jwtAccessSecret");
    if (!decoded) {
      return response.status(404).json({ message: "No user found" });
    }
    if (!access_token) {
      return response.status(404).json({ message: "Not Login" });
    }

    next();
  } catch (err: any) {
    return response.status(401).json({ message: "Unauthorized!" });
  }
};
