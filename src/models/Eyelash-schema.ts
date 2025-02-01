import mongoose from "mongoose";

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

const Eyelash = mongoose.model("Eyelash", EyelashSchema);

export { Eyelash, EyelashSchema };
