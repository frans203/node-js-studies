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
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
      return user;
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

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
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
