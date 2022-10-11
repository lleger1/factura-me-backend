import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: () => void) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No existe token en la peticion",
    });
  }
  try {
    const tokenInfo = verify(token, process.env.SECRET_JWT_SEED!);

    req.body = { tokenInfo, payload: { ...req.body } };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};
