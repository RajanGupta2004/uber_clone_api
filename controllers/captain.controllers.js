import Captain from "../models/captain.model.js";
import {
  createCaptain,
  findCaptainByEmail,
  findCaptainById,
  generateJwtToken,
} from "../services/captain.services.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

export const registerCaptain = async (req, res) => {
  const { fullName, email, password, vehicle } = req.body;

  if ((!fullName, !email || !password || !vehicle)) {
    return res.status(400).json({ message: "All field are required...." });
  }
  try {
    const isCaptainExist = await findCaptainByEmail(email);

    if (isCaptainExist) {
      return res
        .status(400)
        .json({ message: "captain already exist with this email" });
    }

    const hashedPassword = await hashPassword(password);

    const newCaptain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await generateJwtToken({ id: newCaptain._id });

    res.cookie("token", token);

    return res.status(201).json({ message: "captain created", token });
  } catch (error) {
    console.log("Error", error);
    return res.status(200).json({ message: "Internal server error" });
  }
};

export const loginCaptain = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All filed are required...." });
  }

  try {
    const captain = await findCaptainByEmail(email);

    if (!captain) {
      return res
        .status(400)
        .json({ message: "captain already doest not exist with this email" });
    }

    const isPasswordCorrect = await comparePassword(password, captain.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    const token = await generateJwtToken({ id: captain._id });

    res.cookie("token", token);

    return res.status(200).json({ message: "successfull", token });
  } catch (error) {
    console.log("Error", error);
    return res.status(200).json({ message: "Internal server error" });
  }
};

export const captainProfile = async (req, res) => {
  try {
    const captainId = req.captain.id;

    const captain = await findCaptainById(captainId);

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    return res.status(200).json({ captain });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ message: "Internal server error " });
  }
};
