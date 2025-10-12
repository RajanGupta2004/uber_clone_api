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

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email: email }).select("+password");

    console.log("user", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "email and password not match..." });
    }

    const comparePassword = await User.comparePassword(password, user.password);

    console.log("comparePassword", comparePassword);

    if (!comparePassword) {
      return res.status(401).json({ message: "email and password not match" });
    }

    const token = user.generateJwtToken();

    console.log("token", token);

    return res.status(201).json({
      success: true,
      data: { token, user },
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};
