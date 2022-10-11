"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const auth_1 = require("./routes/auth");
const config_1 = require("./database/config");
const cors_1 = __importDefault(require("cors"));
const invoices_1 = require("./routes/invoices");
//Crear el servidor de express
const app = (0, express_1.default)();
//Base de datos
(0, config_1.dbConnection)();
//CORS
app.use((0, cors_1.default)());
//Directorio Pubico
app.use(express_1.default.static("public"));
//Lectura y parseo del body
app.use(express_1.default.json());
//Rutas
app.use("/api/auth", auth_1.authRouter);
app.use("/api/invoices", invoices_1.invoiceRouter);
app.get("*", (req, res) => {
    res.sendFile("/app/public/index.html");
});
//TODO: CRUD: Facturas
//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servicio corriendo en puerto ${process.env.PORT}`);
});
