import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

const signJwt = (
  payload: object,
  keyName: "jwtAccessSecret" | "jwtRefreshSecret",
  options: SignOptions
) => {
  const key = config.get<string>(keyName);
  return jwt.sign(payload, key, {
    ...(options && options),
  });
};

export const generateTokens = (user: object) => {
  const access_token = signJwt(user, "jwtAccessSecret", {
    algorithm: "HS256",
    expiresIn: "5m",
  });

  const refresh_token = signJwt(user, "jwtRefreshSecret", {
    algorithm: "HS256",
    expiresIn: "60m",
  });

  return { access_token, refresh_token };
};

export const verifyJwt = (
  token: string,
  keyName: "jwtAccessSecret" | "jwtRefreshSecret"
) => {
  try {
    const Key = config.get<string>(keyName);
    const decoded = jwt.verify(token, Key);

    return decoded;
  } catch (error) {
    return null;
  }
};
