const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("this always runs");
  next();
});

// app.use((req, res, next) => {
//   //   console.log("in middleware");
//   //   next(); //allow the request to go to the next middleware function
// }); //allows to add a new middleware function
// // this function inside will be executed for every incoming requests

app.use("/add-product", (req, res, next) => {
  console.log("add product");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'/><button type='submit'>Add product</button></form>"
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("homepage");
  res.send("<h1>homepage!</h1>");
});

app.listen(3000);
