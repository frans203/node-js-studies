const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[6].split("=")[1] === "true";
  console.log(isLoggedIn);

  res.render("auth/login", {
    pageTitle: "Auth Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const bodyEmail = req.body.email;
  User.findOne({ email: bodyEmail })
    .then((result) => result)
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      return user;
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
