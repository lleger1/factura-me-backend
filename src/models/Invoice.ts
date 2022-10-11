import { model, Schema, Types } from "mongoose";

export interface IInvoice {
  concept: string;
  client: string;
  qty: number;
  price: number;
  taxes: number;
  subtotal: number;
  total: number;
  created: Date;
  user: Types.ObjectId;
  status: boolean;
}

const InvoiceSchema = new Schema<IInvoice>({
  concept: { type: String, required: true },
  client: { type: String },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  taxes: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  created: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean, required: true, default: true },
});

InvoiceSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Invoice = model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
