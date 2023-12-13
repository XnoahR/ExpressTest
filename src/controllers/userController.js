import Express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";  // Cross Origin Resource Sharing    
import user from "../models/userModel.js";
import { where } from "sequelize";
import {bucket, folderName} from "../utils/bucket.js";
import md5 from "md5";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = Express();


app.use(fileUpload());
app.use(Express.json());
app.use(cors());

// const profile = (req, res) => {
//   user
//     .findAll({
//       where: { role: 1 },
//     })
//     .then((result) => {
//       res.send(result);
//     });
// };

const profile = (req, res) => {
  const id = req.user.id;
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
  const id = req.user.id;
  user
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      //json
      res.send(result);
    });
};

const updateProfile = async (req, res) => {
  try {
    const { username, email,name, password } = req.body;
    const id = req.user.id;
    const file = req.files;
    var newProfilePicture = user.findByPk(id).profile_picture;
    if (file) {
      const fileName = file.file.name;
      const ext = path.extname(fileName);
      const newFileName = md5(new Date().getTime()) + ext;
      newProfilePicture = `${req.protocol}://storage.googleapis.com/petmebucket/user_data/${newFileName}`;
      file.file.mv(`./public/img/${newFileName}`, async (err) => {
        if(err) return res.status(500).json({ message: "Internal Server Error" });
          try{
            await bucket.upload(
              `./public/img/${newFileName}`,
              {
                destination: `user_data/${newFileName}`,
                public: true,
                metadata: {
                  contentType: "image/png",
                },
              }
            );
            fs.unlinkSync(`./public/img/${newFileName}`);
          }catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
          }
      });

    }

    // Update the user record
    await user.update(
      {
        username,
        email,
        name,
        password,
        profile_picture: newProfilePicture,
      },
      {
        where: { id: id },
      }
    );

    res.json({
      message: "Profile updated",
      data: {
        username,
        email,
        name,
        password,
        profile_picture: newProfilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});


const uploadFile = async (req, res) => {
  if(req.files === null){
    return res.status(400).json({ message: "No file uploaded" });
  }
  const file = req.files.file;
  const fileName = file.name;
  const fileSize = file.data.length;
  const ext = path.extname(fileName);
  const newFileName = md5(new Date().getTime()) + ext;
  const url = `${req.protocol}://storage.googleapis.com/petmebucket/user_data/${newFileName}`;
  const allowedExt = [".png", ".jpg", ".jpeg"];

  if(!allowedExt.includes(ext.toLowerCase())){
    return res.status(422).json({ message: "File type not allowed" });
  }
  if(fileSize > 5000000){
    return res.status(422).json({ message: "File size too large" });
  }

  
  file.mv(`./public/img/${newFileName}`, async (err) => {
  if(err) return res.status(500).json({ message: "Internal Server Error" });
    try{
      await bucket.upload(
        `./public/img/${newFileName}`,
        {
          destination: `user_data/${newFileName}`,
          public: true,
          metadata: {
            contentType: "image/png",
          },
        }
      );
      fs.unlinkSync(`./public/img/${newFileName}`);
      res.json({ fileName: newFileName, filePath: url });
    }catch(error){
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});
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
export { profile, editProfile, updateProfile,  };
