import mongoose from "mongoose";

const EyelashSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const Eyelash = mongoose.model("Eyelash", EyelashSchema);

export { Eyelash, EyelashSchema };
