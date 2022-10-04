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
const flash = require("connect-flash");

const csrfProtection = csrf({});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

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

app.use(errorController.error);

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
