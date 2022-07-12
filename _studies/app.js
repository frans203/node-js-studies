const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const rootDir = require("./util/path");
const shopRoute = require("./routes/shop");
const adminData = require("./routes/admin");
const expressHbs = require("express-handlebars");

app.set("view engine", "pug");
app.set("views", "views"); //default
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminData.routes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found" });
});

app.listen(3000);
