const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
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

mongoConnect(() => {
  app.listen(3000);
});
