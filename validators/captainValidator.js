import { body } from "express-validator";

export const captainRegisterValidator = [
  body("fullName.firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("In valid email")
    .notEmpty()
    .withMessage("email required"),

  body("password")
    .notEmpty()
    .withMessage("Passord must be required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("vehicle.color")
    .notEmpty()
    .withMessage("color  field is required")
    .isString()
    .withMessage("color be string"),

  body("vehicle.plate")
    .notEmpty()
    .withMessage("plate must have value")
    .isString()
    .withMessage("plate be in number"),

  body("vehicle.capacity")
    .notEmpty()
    .withMessage("capacity must have value")
    .isNumeric()
    .withMessage("capacity be in number"),

  body("vehicle.vehicleType")
    .notEmpty()
    .withMessage("vehicleType must have value")
    .isString()
    .withMessage("vehicleType be in  string"),
];

export const captainLoginValidator = [
  body("email")
    .isEmail()
    .withMessage("In valid email")
    .notEmpty()
    .withMessage("email required"),

  body("password")
    .notEmpty()
    .withMessage("Passord must be required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
