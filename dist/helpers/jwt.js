"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generarJWT = generarJWT;
