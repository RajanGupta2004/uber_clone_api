import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log("error", error);
  }
};

export const comparePassword = async (enteredPassword, hashedPassword) => {
  console.log(
    "enteredPassword, hashedPassword",
    enteredPassword,
    hashedPassword
  );
  try {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  } catch (error) {
    console.log("error", error);
  }
};
