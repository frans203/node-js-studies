const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((e) => console.log(e));
  next();
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.error);

mongoConnect(() => {
  app.listen(3000);
});
