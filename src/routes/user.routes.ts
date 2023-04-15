import express, { NextFunction, Request, Response } from "express";
// import fetch from "node-fetch";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.get(
  "/me",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      res.status(200).status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/", async (request: Request, res: Response) => {
  // promise syntax
  fetch(
    "https://dbo.one.com.pe/services/api/ApiVehiculo/ObtenerVehiculoWeb/1790"
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    // .then((data) => JSON.parse(data.Listado))
    .then((listado) => res.status(200).json(listado))
    .catch((err) => console.error("error:" + err));

  // try {
  //   let data = await fetch(
  //     "https://dbo.one.com.pe/services/api/ApiVehiculo/ObtenerVehiculoWeb/0"
  //   );
  //   data = await data.json();
  //   let listado = await JSON.parse(data.Listado);
  //   res.status(200).json(data);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ msg: `Internal Server Error.` });
  // }
});
export default router;
