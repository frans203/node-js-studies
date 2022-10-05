const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Auth Login",
    path: "/login",
    errorMessage: req.flash("error"),
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((result) => {
      if (!result) {
        req.flash("error", "Invalid Email or password");
      } else {
        return result;
      }
    })
    .then((data) => {
      bcrypt.compare(password, data.password).then((result) => {
        if (result) {
          req.session.isLoggedIn = true;
          req.session.user = data;
          return req.session.save((err) => {
            console.log(err);
            return res.redirect("/");
          });
        } else {
          req.flash("error", "Password Error");
          return res.redirect("/login");
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
    errorMessage: req.flash("error"),
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      pageTitle: "SignUp",
      path: "/signup",
      errorMessage: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Account with this email already exists");
        return res.redirect("/signup");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { item: [] },
        });

        return user.save();
      });
    })
    .then(() => {
      return transporter
        .sendMail({
          to: email,
          from: "franciscosantana203@gmail.com",
          subject: "Signup succeeded",
          html: "<h1>You successfully signup</h1>",
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: req.flash("error"),
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with this email!");
        }

        user.resetToken = token;
        user.tokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        res.redirect("/");
        transporter
          .sendMail({
            to: req.body.email,
            from: "franciscosantana203@gmail.com",
            subject: "Signup succeeded",
            html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
        `,
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  return User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      return res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        userId: user._id.toString(),
        passwordToken: token,
        errorMessage: req.flash(),
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  let resetUser;

  return User.findOne({
    _id: userId,
    resetToken: passwordToken,
    tokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((newHashedPassword) => {
      resetUser.password = newHashedPassword;
      resetUser.tokenExpiration = undefined;
      resetUser.resetToken = undefined;

      return resetUser.save();
    })
    .then(() => {
      return res.redirect("/login");
    })
    .catch((e) => {
      console.log(e);
    });
};
