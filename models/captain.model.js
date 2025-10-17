import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "first name at least 3 character"],
      maxLength: 30,
    },
    lastName: { type: String },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "password at least 6 character"],
  },

  socketId: { type: String, default: "" },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
    },

    plate: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "AtLeast on capacity"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motercycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },

    lng: {
      type: Number,
    },
  },
});

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;
