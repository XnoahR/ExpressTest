import Express from "express";
import user from "../models/userModel.js";
import animal from "../models/animalModel.js";
import post from "../models/postModel.js";
// import favourite from "../models/favouriteModel.js";

import { getPost, createPost, findPost, editPost, updatePost, deletePost,userPost } from "../controllers/postController.js";
const router = Express.Router();

router.get("/", getPost);
router.get("find/:id", findPost);
router.get("/my/collection", userPost);
router.get("/edit/:id", editPost);
router.post("/create", createPost); 
router.patch("/edit/:id", updatePost);
router.delete("/:id", deletePost);




export default router;