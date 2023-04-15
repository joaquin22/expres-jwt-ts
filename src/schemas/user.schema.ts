import { TypeOf, object, string, z } from "zod";

export const registerUserScheme = object({
  body: object({
    firstName: string({
      required_error: "First Name is required",
    }),
    lastName: string({
      required_error: "last Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be more than 8 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

export const loginUserScheme = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type registerUserType = TypeOf<typeof registerUserScheme>["body"];
export type loginUserType = TypeOf<typeof loginUserScheme>["body"];
