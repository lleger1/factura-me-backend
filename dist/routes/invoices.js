"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRouter = void 0;
/*
  Rutas de negocios /invoices
  host + /api/invoices
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const invoices_1 = require("../controllers/invoices");
const router = (0, express_1.Router)();
exports.invoiceRouter = router;
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const isDate_1 = require("../helpers/isDate");
router.use(validar_jwt_1.validarJWT);
//obtener facturas
router.get("/", invoices_1.getInvoices);
//crear factura
router.post("/", [
    (0, express_validator_1.check)("payload.concept", "Concepto no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.qty", " Cantidad no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.price", "Precio no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.taxes", "Impuestos no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.subtotal", "Subtotal no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.total", "Total no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.created", "Fecha creacion no debe estar vacio").notEmpty(),
    (0, express_validator_1.check)("payload.created", "Fecha creacion no debe estar vacio").custom(isDate_1.isDate),
    validar_campos_1.validarCampos,
], invoices_1.createInvoice);
//desabilitar factura
router.put("/:id", invoices_1.disableInvoice);
