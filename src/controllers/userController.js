import Express from "express";
import user from "../models/userModel.js";
import { where } from "sequelize";


const app = Express();

app.use(Express.json());

const profile = (req, res) => {
  user
    .findAll({
      where: { role: 1 },
    })
    .then((result) => {
      res.send(result);
    });
};

const findProfile = (req, res) => {
  const id = req.params.id;
  user
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      //json
      res.send(result);
    });
};

const editProfile = (req, res) => {
  const id = req.params.id;
  user
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      //json
      res.send(result);
    });
};

const updateProfile = (req, res) => {
  const { username, email, password } = req.body;
  const id = req.params.id;

  user.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 1,
      name: "John Doe",
    },
    {
      where: { id: id },
    }
  );
  res.send("Data updated");
};

// const userFavourite = (req, res) => {
//   favourite
//     .findAll({
//       where: { id_user: req.params.id },
//     })
//     .then((result) => {
//       res.send(result);
//     });
// };
export { profile, findProfile, editProfile, updateProfile};
