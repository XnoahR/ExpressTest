import Express from "express";
import user from "../models/userModel.js";
import { profile, createProfile } from "../controllers/userController.js";

const router = Express.Router();

// router.get("/", );

router.get("/", profile);
router.post("/", createProfile);


export default router;
