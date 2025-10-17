import express from "express";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidator.js";
import validateRequest from "../middleware/validateRequest.middleware.js";
import * as userController from "../controllers/user.controllers.js";
import authUser from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  validateRequest,
  userController.RegiterUser
);
router.post(
  "/login",
  loginUserValidator,
  validateRequest,
  userController.Login
);
router.get("/profile", authUser, userController.getProfile);
router.get("/logout", authUser, userController.logOutUser);

export default router;
