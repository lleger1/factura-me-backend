import moment from "moment";
import { CustomValidator } from "express-validator";

// This allows you to reuse the validator
export const isDate: CustomValidator = (value) => {
  if (!value) {
    return false; // Si regresa false es para que falle
  }

  const fecha = moment(value);

  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};
