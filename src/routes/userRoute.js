import Express from "express";
import user from "../models/userModel.js";

// import favourite from "../models/favouriteModel.js";
import {
  profile,
  editProfile,
  updateProfile,
  userFavourite,
  addFavourite,
  deleteFavourite,  
  
} from "../controllers/userController.js";
import multer from "multer";



const router = Express.Router();

// router.get("/", );

router.get("/:id", profile);
router.get("/edit/:id", editProfile);
router.patch("/edit/:id", updateProfile);
router.get("/favourite", userFavourite);
router.delete("/favourite/:id", deleteFavourite);
// router.get("/favourite/:id",userFavourite );



export default router;
