import favourite from "../models/favouriteModel.js";
import post from "../models/postModel.js";
import user from "../models/userModel.js";
import sequelize from "../utils/db.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await user.findOne({
        where: {
            email: email,
            password: password,
        },
        });
        if (checkUser) {
        res.send(checkUser);
        } else {
        res.send("User not found");
        }
    } catch (err) {
        res.send(err.message);
    }
    }