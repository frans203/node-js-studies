const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[6].split("=")[1] === "true";
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  const bodyEmail = req.body.email;
  User.findOne({ email: bodyEmail })
    .then((result) => {
      return result;
    })
    .then((data) => {
      req.session.user = data;
      req.session.isLoggedIn = true;
      return data;
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
