const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findById("631685105b28fbd0142e0f62")
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});
app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.error);

mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.hkjnjx2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DATABASE CONNECTED");

    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: "Santana",
          email: "test@gmail.com",
          cart: { items: [] },
        });

        newUser.save();
      }
    });
    app.listen(3000);
    console.log("SERVER RUNNING");
  })
  .catch((e) => {
    console.log(e);
  });
