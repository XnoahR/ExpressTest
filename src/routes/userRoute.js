import Express from "express";
import user from "../models/userModel.js";
import {
  profile,
  createProfile,
  findProfile,
  editProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = Express.Router();

// router.get("/", );

router.get("/", profile);
router.post("/", createProfile);
router.get("/:id", findProfile);
router.get("/edit/:id", editProfile);
router.patch("/edit/:id", updateProfile);

export default router;
