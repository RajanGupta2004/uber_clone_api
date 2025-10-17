import {
  createCaptain,
  findCaptainByEmail,
  generateJwtToken,
} from "../services/captain.services.js";
import { hashPassword } from "../utils/hashPassword.js";

export const registerCaptain = async (req, res) => {
  const { fullName, email, password, vehicle, location } = req.body;

  console.log(fullName, email, password, vehicle, location);

  // if (
  //   !firstName ||
  //   !lastName ||
  //   !email ||
  //   !password ||
  //   !color ||
  //   !plate ||
  //   !vehicleType ||
  //   !capacity
  // ) {
  //   return res.status(400).json({ message: "All field are required...." });
  // }
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
