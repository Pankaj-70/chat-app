import express from "express";
import {
  checkUser,
  login,
  logout,
  profileUpdate,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, profileUpdate);
router.get("/check", protectRoute, checkUser);

export default router;
