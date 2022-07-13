const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const homeRoute = require("./routes/homepage");
const usersRoute = require("./routes/users");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoute);
app.use(usersRoute);

app.listen(3000);
