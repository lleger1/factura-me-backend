"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvoiceSchema = new mongoose_1.Schema({
    concept: { type: String, required: true },
    client: { type: String },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    taxes: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    created: { type: Date, required: true, default: Date.now },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, required: true, default: true },
});
InvoiceSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
const Invoice = (0, mongoose_1.model)("Invoice", InvoiceSchema);
exports.default = Invoice;
