import express from "express";
// import {sequelize} from "./utils/db.js";
import user from "./models/userModel.js";
import favourite from "./models/favouriteModel.js";
import animal from "./models/animalModel.js";
import post from "./models/postModel.js";
import sequelize from "./utils/db.js";

import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.use((req, res, next) => {
  res.status(404).send("Page not found!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
