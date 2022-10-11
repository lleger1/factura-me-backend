import { model, Schema } from "mongoose";

interface IAgent {
  name: string;
  rnc?: string;
  address: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  bornDate?: Date;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  created: Date;
  agency?: IAgent;
  status: boolean;
}

const UserSchema = new Schema<IUser>({
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
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const User = model<IUser>("User", UserSchema);

export default User;
