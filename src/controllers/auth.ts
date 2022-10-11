import { Request, Response } from "express";
import User from "../models/User";
import { generarJWT } from "../helpers/jwt";
const bcrypt = require("bcryptjs");

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    user = new User(req.body);

    //Encryptar clave
    const salt = bcrypt.genSaltSync();
    user!.password = bcrypt.hashSync(password, salt);

    await user!.save();

    const token = await generarJWT(user!.id, user!.name);

    res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

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
    const token = await generarJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const revalidateToken = async (req: Request, res: Response) => {
  const { uid, name } = req.body.tokenInfo;

  try {
    const user = await User.findById(uid);

    const token = await generarJWT(uid, name);

    res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export const updateAgency = async (req: Request, res: Response) => {
  const { payload } = req.body;
  const { uid } = req.body.tokenInfo;

  try {
    const user = await User.findById(uid);

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
    const userUpdated = await User.findByIdAndUpdate(uid, newAgency, {
      new: true,
    });

    return res.status(201).json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
