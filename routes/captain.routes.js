import express from "express";

import * as captainControllers from "../controllers/captain.controllers.js";
import { captainRegisterValidator } from "../validators/captainValidator.js";
import validateRequest from "../middleware/validateRequest.middleware.js";

const router = express.Router();

router.post(
  "/register",
  captainRegisterValidator,
  validateRequest,
  captainControllers.registerCaptain
);

export default router;
