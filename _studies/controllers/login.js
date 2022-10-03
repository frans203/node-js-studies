const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[6].split("=")[1] === "true";

  res.render("auth/login", {
    pageTitle: "Auth Login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((result) => result)
    .then((data) => {
      if (!data) {
        return res.redirect("/login");
      }

      bcrypt.compare(password, data.password).then((result) => {
        if (result) {
          req.session.isLoggedIn = true;
          req.session.user = data;
          return req.session.save((err) => {
            console.log(err);
            return res.redirect("/");
          });
        }
      });
    })
    .catch((e) => {
      console.log(e);
      res.redirect("/login");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.redirect("/");
      }
      const user = new User({
        email: email,
        password: password,
        cart: { items: [] },
      });
      console.log(user);

      return user.save();
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      console.log(e);
    });
};
