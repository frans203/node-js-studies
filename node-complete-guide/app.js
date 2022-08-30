const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const errorController = require("./controllers/error");
const mongoConntect = require("./util/database").mongoConnect;
const app = express();

//REMEMBER: LEAVE EVERYTHING ABOUT EJS ONLY, WHEN GO TO STUDIES

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
//app.set("view engine", "pug"); //setting template engine with express method set()
//app.set("view engine", "hbs"); //seting handlebars as template
app.set("view engine", "ejs"); //setting EJS as a template engine
app.set("views", "views"); //views is the default path for the views on the app by express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //user is able to access public path trough html files
app.use((req, res, next) => {
  User.findById("630ca8091670d79d41d1ec49")
    .then((user) => {
      console.log("finding user", user);
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((e) => console.log(e));
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

mongoConntect(() => {
  app.listen(3000);
});
