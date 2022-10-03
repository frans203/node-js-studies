const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[6].split("=")[1] === "true";
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((result) => {
      return result;
    })
    .then((data) => {
      if (!data) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, data.password)
        .then((result) => {
          if (result) {
            req.session.user = data;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            return res.redirect("/login");
          }
        })
        .catch((e) => {
          console.log(e);
          res.redirect("/login");
        });

      return data;
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
    pageTitle: "SignUp",
    path: "/signup",
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log(email, password);
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }

      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });

        return user.save();
      });
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      console.log(e);
    });
};
