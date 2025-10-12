import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Unauthorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorised" });
  }
};

export default authUser;
