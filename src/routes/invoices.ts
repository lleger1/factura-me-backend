/*
  Rutas de negocios /invoices
  host + /api/invoices
*/
import { Router } from "express";
import { check } from "express-validator";
import {
  getInvoices,
  createInvoice,
  disableInvoice,
} from "../controllers/invoices";
const router = Router();

import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { isDate } from "../helpers/isDate";

router.use(validarJWT);

//obtener facturas
router.get("/", getInvoices);

//crear factura
router.post(
  "/",
  [
    check("payload.concept", "Concepto no debe estar vacio").notEmpty(),
    check("payload.qty", " Cantidad no debe estar vacio").notEmpty(),
    check("payload.price", "Precio no debe estar vacio").notEmpty(),
    check("payload.taxes", "Impuestos no debe estar vacio").notEmpty(),
    check("payload.subtotal", "Subtotal no debe estar vacio").notEmpty(),
    check("payload.total", "Total no debe estar vacio").notEmpty(),
    check("payload.created", "Fecha creacion no debe estar vacio").notEmpty(),
    check("payload.created", "Fecha creacion no debe estar vacio").custom(
      isDate
    ),
    validarCampos,
  ],
  createInvoice
);

//desabilitar factura
router.put("/:id", disableInvoice);

// //Eliminar agente
// router.delete("/:id", deleteInvoice);

export { router as invoiceRouter };
