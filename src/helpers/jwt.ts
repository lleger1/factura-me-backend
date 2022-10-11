import { sign } from "jsonwebtoken";

export const generarJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
