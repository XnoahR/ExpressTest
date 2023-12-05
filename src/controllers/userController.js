import user from "../models/userModel.js";

const profile = (req, res) => {
  user.findAll().then((result) => {
    res.send(result);
  });
};



const createProfile = (req, res) => {
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

export { profile, createProfile };
