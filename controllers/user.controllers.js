import User from "../models/user.model.js";
import * as userService from "../services/user.services.js";

export const RegiterUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.find({ email: email });
    if (existingUser.length) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashedPassword = await User.hashPassword(password);

    const newUser = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = newUser.generateJwtToken();

    return res.status(201).json({
      success: true,
      data: { token, user: newUser },
    });
  } catch (error) {
    console.log("Error in user registration", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
