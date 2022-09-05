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
  User.findById("630ca8091670d79d41d1ec49")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
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
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });
