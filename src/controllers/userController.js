import Express from "express";
import fileUpload from "express-fileupload";
import cors from "cors"; // Cross Origin Resource Sharing
import user from "../models/userModel.js";
import favourite from "../models/favouriteModel.js";
import { where } from "sequelize";
import { bucket, folderName } from "../utils/bucket.js";
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

//Buat ke halaman profile
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

//Buat ke halaman edit profile
const editProfile = (req, res) => {
  const id = req.user.id;
  user
    .findAll({
      where: { id: id },
    })
    .then((result) => {
      //json
      res.json(result);
    });
};

//Buat update profile
const updateProfile = async (req, res) => {
  try {
    const { username, email, name, password, phone } = req.body;
    const id = req.user.id;
    const file = req.files;
    let newProfilePicture = await user.findByPk(id).profile_picture;

    if (file) {
      const fileName = file.file.name;
      const ext = path.extname(fileName);
      const newFileName = md5(new Date().getTime()) + ext;
      newProfilePicture = `${req.protocol}://storage.googleapis.com/petmebucket/user_data/${newFileName}`;

      await uploadFileToBucket(file.file, newFileName); // Separate function for file upload
    }

    // Update the user record
    await user.update(
      {
        username,
        email,
        name,
        password,
        phone,
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

const uploadFileToBucket = async (file, newFileName) => {
  return new Promise((resolve, reject) => {
    file.mv(`./public/img/${newFileName}`, async (err) => {
      if (err) {
        console.error(err);
        reject("Error uploading file");
      }

      try {
        await bucket.upload(`./public/img/${newFileName}`, {
          destination: `user_data/${newFileName}`,
          public: true,
          metadata: {
            contentType: "image/png",
          },
        });

        fs.unlinkSync(`./public/img/${newFileName}`);
        resolve();
      } catch (error) {
        console.error(error);
        reject("Error uploading file to bucket");
      }
    });
  });
};

//Menambahkan favourite
const addFavourite = (req, res) => {
  const id_user = req.user.id;
  const id_post = req.body.id_post;
  try{
  favourite
    .create({
      id_user: id_user,
      id_post: id_post,
    })
    .then((result) => {
      res.status(200).json({ message: "Favourite added", data: result });
    });
  }catch{
    res.send(err.message);
  }
};

//Mengakses favourite
const userFavourite = (req, res) => {
  const id_user = req.user.id;
  try{
  favourite
    .findAll({
      where: { id_user: id_user },
    })
    .then((result) => {
      res.json(result);
    });
  }catch(err){
    res.send(err.message);
  }
};

//Menghapus favourite


export {
  profile,
  editProfile,
  updateProfile,
  addFavourite,
  userFavourite,
  
};
