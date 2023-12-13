import Express from "express";
import user from "../models/userModel.js";

// import favourite from "../models/favouriteModel.js";
import {
  profile,
  findProfile,
  editProfile,
  updateProfile,
  uploadFile,
  upload
} from "../controllers/userController.js";
import multer from "multer";



const router = Express.Router();

// router.get("/", );

router.get("/", profile);
router.get("/:id", findProfile);
router.get("/edit/:id", editProfile);
router.post("/upload",uploadFile);
router.patch("/edit/:id", updateProfile);
// router.get("/favourite/:id",userFavourite );



export default router;
