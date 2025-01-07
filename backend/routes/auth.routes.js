import express from "express";
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  userSignup,
  userSignin,
  userLogout,
  updateProfile,
  checkAuth
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", userSignup);

router.post("/login", userSignin);

router.post("/logout", userLogout);

router.put('/updateprofile',protectRoute,updateProfile);

router.get('/check',protectRoute,checkAuth);
export default router;
