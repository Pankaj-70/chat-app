import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(404).json({
        message: "Unauthorized user - No tokens provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      res.status(404).json({
        message: "Unauthorized user - Invalid Token",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({
        message: "Unauthorized user - User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute: ", error);
  }
};
