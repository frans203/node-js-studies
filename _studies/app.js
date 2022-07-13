const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const shopRoute = require("./routes/shop");
const adminData = require("./routes/admin");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminData.routes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found", path: false });
});

app.listen(3000);
