import Express from "express";
import user from "../models/userModel.js";
// import favourite from "../models/favouriteModel.js";
import {
  profile,
  findProfile,
  editProfile,
  updateProfile
} from "../controllers/userController.js";

const router = Express.Router();

// router.get("/", );

router.get("/", profile);
router.get("/:id", findProfile);
router.get("/edit/:id", editProfile);
router.patch("/edit/:id", updateProfile);
// router.get("/favourite/:id",userFavourite );



export default router;
