import Captain from "../models/captain.model.js";

import jwt from "jsonwebtoken";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
  color,
  capacity,
  plate,
  vehicleType,
}) => {
  console.log(
    ">>",
    firstName,
    lastName,
    email,
    hashedPassword,
    color,
    capacity,
    plate,
    vehicleType
  );
  const captain = await Captain.create({
    fullName: {
      firstName: firstName,
      lastName: lastName,
    },
    email,
    password: hashedPassword,
    vehicle: {
      color,
      capacity,
      plate,
      vehicleType,
    },
  });

  return captain;
};

export const findCaptainByEmail = async (email) => {
  return Captain.findOne({ email }).select("+password");
};

export const findCaptainById = async (captainId) => {
  return Captain.findById(captainId);
};

export const generateJwtToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};
