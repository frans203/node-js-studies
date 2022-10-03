const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const loginRoutes = require("./routes/login");
const User = require("./models/user");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const MONGODB_URI =
  "mongodb+srv://admin:1234@cluster0.hkjnjx2.mongodb.net/?retryWrites=true&w=majority";
const errorController = require("./controllers/error");
const app = express();
const csrf = require("csurf");
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf({});

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
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(loginRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB CONNECTED");
    console.log("SERVER RUNNING");
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });
