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
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    agency: {
        name: { type: String, default: null },
        rnc: { type: String, unique: true },
        address: { type: String, default: null },
        phone: { type: String, default: null },
        whatsapp: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        bornDate: { type: Date },
    },
    created: { type: Date, required: true, default: Date.now },
    status: { type: Boolean, required: true, default: true },
});
UserSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
