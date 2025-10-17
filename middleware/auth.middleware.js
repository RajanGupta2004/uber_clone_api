import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import BackListToken from "../models/backListToken.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  // console.log("token middleware", token);

  if (!token) {
    return res.status(403).json({ message: "Unauthorised" });
  }

  try {
    const backListedToken = await BackListToken.findOne({ token });

    if (backListedToken) {
      return res.status(403).json({ message: "Unauthorised user" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorised" });
  }
};

export default authUser;
