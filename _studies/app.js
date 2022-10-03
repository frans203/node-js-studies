const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const loginRoutes = require("./routes/login");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const csrfProtection = csrf({});

const MONGODB_URI =
  "mongodb+srv://admin:1234@cluster0.hkjnjx2.mongodb.net/?retryWrites=true&w=majority";

const store = new MongoDbStore({ uri: MONGODB_URI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "test secret",
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
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(loginRoutes);

app.use(errorController.error);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DATABASE CONNECTED");
    console.log("SERVER RUNNING");
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });
