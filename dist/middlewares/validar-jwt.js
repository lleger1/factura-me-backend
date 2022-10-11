"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No existe token en la peticion",
        });
    }
    try {
        const tokenInfo = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT_SEED);
        req.body = { tokenInfo, payload: Object.assign({}, req.body) };
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        });
    }
    next();
};
exports.validarJWT = validarJWT;
