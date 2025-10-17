import express from "express";

import * as captainControllers from "../controllers/captain.controllers.js";
import {
  captainLoginValidator,
  captainRegisterValidator,
} from "../validators/captainValidator.js";
import validateRequest from "../middleware/validateRequest.middleware.js";

const router = express.Router();

router.post(
  "/register",
  captainRegisterValidator,
  validateRequest,
  captainControllers.registerCaptain
);

router.post(
  "/login",
  captainLoginValidator,
  validateRequest,
  captainControllers.loginCaptain
);

export default router;
