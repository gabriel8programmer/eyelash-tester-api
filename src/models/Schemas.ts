import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "standard",
  },
});

const EyelashSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const CodeSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Number,
    default: () => Date.now() + 10 * 60 * 1000, //expira por padrão em 10 minutos
  },
});

const UserModel = mongoose.model("User", UserSchema);
const EyelashModel = mongoose.model("Eyelash", EyelashSchema);
const CodeModel = mongoose.model("Code", CodeSchema);

export { UserModel, EyelashModel, CodeModel };
