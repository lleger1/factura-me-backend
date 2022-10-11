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
exports.disableInvoice = exports.createInvoice = exports.getInvoices = void 0;
const Invoice_1 = __importDefault(require("../models/Invoice"));
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body.tokenInfo;
    const invoices = yield Invoice_1.default.find({ user: uid }).populate("user", "name");
    return res.status(201).json({
        ok: true,
        invoices,
    });
});
exports.getInvoices = getInvoices;
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = req.body;
    const { uid } = req.body.tokenInfo;
    const invoice = new Invoice_1.default(payload);
    try {
        invoice.user = uid;
        const invoiceSaved = yield invoice.save();
        return res.status(201).json({
            ok: true,
            invoice: invoiceSaved,
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
exports.createInvoice = createInvoice;
const disableInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { payload } = req.body;
    const { uid } = req.body.tokenInfo;
    const invoiceID = req.params.id;
    try {
        const invoice = yield Invoice_1.default.findById(invoiceID);
        if (!invoice) {
            return res.status(404).json({
                ok: false,
                msg: "Factura no existe por ese id",
            });
        }
        if (invoice.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio para editar esa factura",
            });
        }
        invoice.status = false;
        //El tercer argumento es para que enive eldato nuevo
        const invoiceUpdated = yield Invoice_1.default.findByIdAndUpdate(invoiceID, invoice, {
            new: true,
        });
        return res.status(201).json({
            ok: true,
            invoice: invoiceUpdated,
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
exports.disableInvoice = disableInvoice;
