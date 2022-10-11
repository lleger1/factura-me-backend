/*
  Rutas de usuarios /Auth
  host + /api/auth
*/
import { Router } from "express";
import { check } from "express-validator";
const router = Router();

import {
  createUser,
  loginUser,
  revalidateToken,
  updateAgency,
} from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio!").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [check("email", "El email es obligatorio").isEmail(), validarCampos],
  loginUser
);

router.get("/renew", validarJWT, revalidateToken);

router.put(
  "/agency",
  [
    validarJWT,
    check("payload.name", "Nombre de empresa obligatorio").notEmpty(),
    check("payload.address", "Direccion de empresa obligatorio").notEmpty(),
    check(
      "payload.phone",
      "Numero de contacto de empresa obligatorio"
    ).notEmpty(),
    validarCampos,
  ],
  updateAgency
);

export { router as authRouter };
