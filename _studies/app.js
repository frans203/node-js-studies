const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminRoutes);

app.use(errorController.error);

app.listen(3000);

//stopped in post function for products
