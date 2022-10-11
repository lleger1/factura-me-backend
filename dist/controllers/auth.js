"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgency = exports.revalidateToken = exports.loginUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con ese correo",
            });
        }
        user = new User_1.default(req.body);
        //Encryptar clave
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        yield user.save();
        const token = yield (0, jwt_1.generarJWT)(user.id, user.name);
        res.status(201).json({
            ok: true,
            user,
            token,
        });
    }
    catch (error) {
        console.error(`[ERROR] ${error}`);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y contrase;a no existen",
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y contrase;a no existen",
            });
        }
        //Generar JWT
        const token = yield (0, jwt_1.generarJWT)(user.id, user.name);
        res.status(200).json({
            ok: true,
            user,
            token,
        });
    }
    catch (error) {
        console.error(`[ERROR] ${error}`);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
});
exports.loginUser = loginUser;
const revalidateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name } = req.body.tokenInfo;
    try {
        const user = yield User_1.default.findById(uid);
        const token = yield (0, jwt_1.generarJWT)(uid, name);
        res.status(200).json({
            ok: true,
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
});
exports.revalidateToken = revalidateToken;
const updateAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = req.body;
    const { uid } = req.body.tokenInfo;
    try {
        const user = yield User_1.default.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe por ese id",
            });
        }
        const newAgency = {
            agency: payload,
            user: uid,
        };
        //El tercer argumento es para que enive eldato nuevo
        const userUpdated = yield User_1.default.findByIdAndUpdate(uid, newAgency, {
            new: true,
        });
        return res.status(201).json({
            ok: true,
            user: userUpdated,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
});
exports.updateAgency = updateAgency;
