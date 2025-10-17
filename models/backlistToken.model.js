import mongoose from "mongoose";

const backlistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    reruired: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BackListToken = mongoose.model("BackListToken", backlistTokenSchema);

export default BackListToken;
