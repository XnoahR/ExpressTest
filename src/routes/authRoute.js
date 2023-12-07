import {login, logout, checkJwt} from "../controllers/authController.js";
import  Express  from "express";

const router = Express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/check/:id", checkJwt);
export default router;