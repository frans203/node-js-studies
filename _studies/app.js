const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.error);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
