import user from "../models/userModel.js";
import Express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = Express();

app.use(Express.json());

const login = (req, res) => {
  const { email, password } = req.body;

  user
    .findAll({
      where: { email: email, password: password },
    })
    .then((result) => {
      if (result.length > 0) {
        const id = result[0].id;
        const token = jwt.sign(
          {
            id: id,
            email: email,
            username: result[0].username,
          },
          process.env.SECRET,
          { expiresIn: 60 * 60 * 1 } // expires in 5min
        );
        return res.json({
          auth: true,
          status: "Success",
          message: "logged in",
          token: token,
          secret: process.env.SECRET,
        });
      } else {
        res.status(401).json({
          auth: false,
          status: "Error",
          message: "Email or password is incorrect",
        });
      }
    });
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

const checkJwt = (req,res) => {
  const jwt = req.cookies.jwt;
  res.send(jwt);
}
export { login, logout, checkJwt};