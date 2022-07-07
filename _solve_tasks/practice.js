const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("users");
  res.send("<h1>USERS PAGE</h1>");
});

app.use("/", (req, res, next) => {
  console.log("homepage");
  res.send("<h1>HOMEPAGE</h1>");
});

app.listen(3000);
