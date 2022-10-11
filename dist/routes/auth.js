"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
/*
  Rutas de usuarios /Auth
  host + /api/auth
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
exports.authRouter = router;
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
router.post("/new", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio!").notEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe de ser de 6 caracteres").isLength({
        min: 6,
    }),
    validar_campos_1.validarCampos,
], auth_1.createUser);
router.post("/", [(0, express_validator_1.check)("email", "El email es obligatorio").isEmail(), validar_campos_1.validarCampos], auth_1.loginUser);
router.get("/renew", validar_jwt_1.validarJWT, auth_1.revalidateToken);
router.put("/agency", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("payload.name", "Nombre de empresa obligatorio").notEmpty(),
    (0, express_validator_1.check)("payload.address", "Direccion de empresa obligatorio").notEmpty(),
    (0, express_validator_1.check)("payload.phone", "Numero de contacto de empresa obligatorio").notEmpty(),
    validar_campos_1.validarCampos,
], auth_1.updateAgency);
