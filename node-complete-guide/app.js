const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const expressHbs = require("express-handlebars");
const productsController = require("./controllers/products");
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

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(productsController.notFound);

app.listen(3000);

// module.exports = path.dirname(require.main.filename);
