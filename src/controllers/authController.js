import user from "../models/userModel.js";
import Express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = Express();

app.use(Express.json());

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};


const register = (req, res) => {
  const { username, email, password } = req.body;

  user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 1,
      name: "John Doe",
    })
    .then((result) => {
      res.send(result);
    });
};



const login = (req, res) => {
  const { email, password } = req.body;
  user.findOne({ where: { email: email } }).then((result) => {
    if (!result || result.password !== password) {
      res.status(401).json({
        status: "Error",
        message: "Invalid email or password",
      });
    } else {
      createSendToken(result, 200, res);
    }
  });
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "Success",
    message: "Logged out",
  });
};

// const checkJwt = (req,res) => {
//   const jwt = req.cookies.jwt;
//   res.send(jwt);
// }
export { login, logout,register };
