import { db } from "../utils/db.server";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const registerUserService = async (user: Omit<User, "id">) => {
  return db.user.create({
    data: user,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
};

export const findUseByEmailService = async (email: string) => {
  return db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });
};
