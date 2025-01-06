import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUserForSidebars,
  sendMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/getUser", protectRoute, getUserForSidebars);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", sendMessages);

export default router;
