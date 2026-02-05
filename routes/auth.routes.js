import express from "express";
import {
  forgotPassword,
  logout,
  resetPassword,
  showForgotPassword,
  showLogin,
  showResetPassword,
  userLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

// show login page
router.get("/login", showLogin);
router.post("/login", userLogin);
router.get("/logout", logout);
router.get("/forget-password", showForgotPassword);
router.post("/forget-password", forgotPassword);
router.get("/reset-password", showResetPassword);
router.post("/reset-password", resetPassword);

export default router;
