import {login, logout} from "../controllers/authController.js";
import  Express  from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.post("/login", login);
router.get("/logout", authMiddleware,logout);

export default router;