import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log("error", error);
  }
};
