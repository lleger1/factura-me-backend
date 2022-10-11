"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const moment_1 = __importDefault(require("moment"));
// This allows you to reuse the validator
const isDate = (value) => {
    if (!value) {
        return false; // Si regresa false es para que falle
    }
    const fecha = (0, moment_1.default)(value);
    if (fecha.isValid()) {
        return true;
    }
    else {
        return false;
    }
};
exports.isDate = isDate;
