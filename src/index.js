import express from "express";
// import {sequelize} from "./utils/db.js";
import user from "./models/userModel.js";
// import favourite from "./models/favouriteModel.js";
import animal from "./models/animalModel.js";
import post from "./models/postModel.js";
import sequelize from "./utils/db.js";
// import bucket from @google-cloud/storage;
import "dotenv/config";
import {bucket, folderName} from "./utils/bucket.js";
import fileUpload from "express-fileupload";

import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";
import authRoutes from "./routes/authRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";

// const storage = new Storage({
//   projectId: "petme-406008",
//   keyFilename: process.env.KEY_FILE_PATH,
// });


const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());
app.use("/user", authMiddleware, userRoutes);
app.use("/post", authMiddleware, postRoutes);
app.use("/account", authRoutes);

app.post("/fileuploader", async (req, res) => {
  const files = req.files;
  res.send(files);
});


app.get("/admin", (req, res) => {
  user.findOrCreate({
    where: {
      username: "admin",
      email: "ray@admin.pet",
      password: "admin",
      role: 2,
      name: "Ray Admin",
    },
  });
  res.send("Admin created");
});

app.get("/bucket", async (req, res) => {
  try{
    const [files] = await bucket.getFiles();
    files.forEach((file) => {
      console.log(file.name);
    });
    res.send(files);
  } catch(err){
    res.send(err.message);
  }
});

app.use((req, res, next) => {
  res.status(404).send("Page not found!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
