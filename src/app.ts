import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes";
import config from "config";
import router from "./routes/user.routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port = config.get<number>("port");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", router);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
