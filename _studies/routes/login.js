const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

router.get("/login", loginController.getLogin);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .normalizeEmail(),
    check("password", "Please enter a password with at least 5 chars")
      .isLength({ min: 5 })
      .trim(),
  ],
  loginController.postLogin
);
router.post("/logout", loginController.postLogout);

router.get("/signup", loginController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please Enter a valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then((user) => {
            if (user) {
              return Promise.reject(
                "E-mail exists already, please pick a different one"
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }),
    check("password", "Please enter a password with at least 5 chars")
      .isLength({ min: 5 })
      .trim(),
    check("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        } else {
          return true;
        }
      }),
  ],
  loginController.postSignup
);

router.get("/reset", loginController.getReset);
router.post("/reset", loginController.postReset);

router.get("/reset/:token", loginController.getNewPassword);
router.post("/new-password", loginController.postNewPassword);

module.exports = router;
