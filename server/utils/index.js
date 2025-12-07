import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error : " + error);
  }
};

export default dbConnection;

export const createJWT = (res, userid) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};
