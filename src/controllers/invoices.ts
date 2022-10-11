import { Request, Response } from "express";
import Invoice, { IInvoice } from "../models/Invoice";

export const getInvoices = async (req: Request, res: Response) => {
  const { uid } = req.body.tokenInfo;
  const invoices: Array<IInvoice> = await Invoice.find({ user: uid }).populate(
    "user",
    "name"
  );

  return res.status(201).json({
    ok: true,
    invoices,
  });
};

export const createInvoice = async (req: Request, res: Response) => {
  const { payload } = req.body;
  const { uid } = req.body.tokenInfo;
  const invoice = new Invoice(payload);

  try {
    invoice.user = uid;

    const invoiceSaved = await invoice.save();

    return res.status(201).json({
      ok: true,
      invoice: invoiceSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export const disableInvoice = async (req: Request, res: Response) => {
  // const { payload } = req.body;
  const { uid } = req.body.tokenInfo;
  const invoiceID = req.params.id;
  try {
    const invoice = await Invoice.findById(invoiceID);

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
    const invoiceUpdated = await Invoice.findByIdAndUpdate(invoiceID, invoice, {
      new: true,
    });

    return res.status(201).json({
      ok: true,
      invoice: invoiceUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
