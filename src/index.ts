import express from "express";
import "dotenv/config";
import { authRouter } from "./routes/auth";
import { dbConnection } from "./database/config";
import cors from "cors";
import { invoiceRouter } from "./routes/invoices";
import { Request, Response } from "express";

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Pubico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", authRouter);

app.use("/api/invoices", invoiceRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile("/app/public/index.html");
});

//TODO: CRUD: Facturas

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servicio corriendo en puerto ${process.env.PORT}`);
});
