const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const expressHbs = require("express-handlebars");
const app = express();

app.engine("handlebars", expressHbs());
app.set("view engine", "pug"); //setting template engine with express method set()
app.set("views", "views"); //views is the default path for the views on the app by express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //user is able to access public path trough html files

app.use(shopRoutes);
app.use("/admin", adminData.routes);

app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Not Found " });
});

app.listen(3000);

// module.exports = path.dirname(require.main.filename);
