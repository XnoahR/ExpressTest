import Express from "express";
import post from "../models/postModel.js";

const router = Express.Router();

const getPost = (req, res) => {
  post.findAll().then((result) => {
    res.send(result);
  });
};

const createPost = (req, res) => {
  const { title, id_user, id_animal } = req.body;
  post
    .create({
      title: req.body.title,
      upload_date: new Date(),
      status: 1,
      id_user: req.body.id_user,
      id_animal: req.body.id_animal,
      post_picture: 'u'
    })
    .then((result) => {
      res
        .status(201)
        .send(
          `Post created. ID: ${result.id}, Title: ${result.title}, Upload Date: ${result.upload_date}, Status: ${result.status}, ID User: ${result.id_user}, ID Animal: ${result.id_animal}`
        );
    });
};

const findPost = (req, res) => {
  const id = req.params.id;
  post
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      res.send(result);
    });
};

const userPost = (req, res) => {
  const user = req.user.id;
// I want to get ID from user
// json: {
//  "id": 1,
//  "exp": 1625241600,
//}
  post
    .findAll({
      where: { id_user: user },
    })
    .then((result) => {
      res.send(result);
    });

};

const editPost = (req, res) => {
  const id = req.params.id;
  post
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      res.send(result);
    });
};

const updatePost = (req, res) => {
  const { title } = req.body;
  const id = req.params.id;
  post.update(
    {
      title: req.body.title,
      date: new Date(),
    },
    { where: { id: id } }
  );
  res.send(`Post updated. ID: ${id}, Title: ${title}`);
};

const deletePost = (req, res) => {
  const id = req.params.id;
  post.destroy({
    where: { id: id },
  });
  res.send(`Post deleted. ID: ${id}`);
};

const addFavourite = (req, res) => {
    const id_user = req.body.id_user;
    const id_post = req.body.id_post;
    favourite
      .create({
        id_user: id_user,
        id_post: id_post,
      })
      .then((result) => {
        res.send(result);
      });
  };

export { getPost, createPost, findPost, editPost, updatePost, deletePost, addFavourite, userPost };
