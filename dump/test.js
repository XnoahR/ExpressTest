const sumNumber = (a, b) => {  
    return a + b;
    }
const squareNumber = (a) => {
    return a * a;
}

module.exports = {
    sumNumber,
    squareNumber
}




// app.get("/", (req, res) => {
//   try {
//     user
//     .findAll({
//       where: { role: 1 },
//       attributes: ["email", "password"],
//     })
//     .then((result) => {
//       res.send(result);
//     });
//     } catch (err) {
//       res.send(err.message);
//     }
//   });
  
//   app.get("/insert", (req, res) => {
//     try {
//       const checkUser = user.findAll({
//         where: {
//           username: "johndoe1",
//           email: "johndo1@gmail.com",
//           password: "123456",
//           role: 1,
//           name: "John Doe",
//           phone: "08123456789",
//         },
//       });
      
//       if (checkUser) {
//         res.send("User already exist");
//       } else {
//         const account = user.build({
//           username: "johndoe1",
//           email: "johndo1@gmail.com",
//           password: "123456",
//           role: 1,
//           name: "John Doe",
//           phone: "08123456789",
//         });
//       }
//     } catch (err) {
//       res.send(err.message);
//     }
//   });
  
//   app.get("/insert2", (req, res) => {
//     const account = user.build({
//       username: "johndoe2",
//       email: "jd2@gmail.com",
//       password: "123456",
//       role: 1,
//       name: "John Doe",
//       phone: "08123456789",
//     });
//     account.save().then((result) => {
//       res.send(result);
//     });
//   });
  
//   app.get("/admin", async (req, res) => {
//     try {
//       const admin = await user.findOrCreate({
//         where: {
//           username: "admin",
//           email: "ray@pet.admin",
//           password: "admin",
//         role: 2,
//         name: "Ray Admin",
//         phone: "08123456789",
//       },
//     });
//     res.send(admin);
//   } catch (err) {
//     res.status(500);
//     res.send(err.message);
//   }
// });

// app.get("/deleteadmin", (req, res) => {
//   user.destroy({
//     where: {
//       role: 2,
//     },
//   });
//   res.send("Admin deleted");
// });

// app.get("/drop", async (req, res) => {
//   //drop all tables in the database if exist
//   await sequelize.drop(); 
//   res.send("All tables dropped");
// });

// app.get("/user/:id", (req, res) => {
//   const id = req.params.id;
//   user.findByPk(id).then((result) => {
//     try {
//       res.send(`User with id ${result.id} is ${result.username}`);
//     } catch (err) {
//       res.send("User not found");
//     }
//   });
// });