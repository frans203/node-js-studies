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
      .withMessage("Please Enter a valid email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one"
            );
          }
        });
      }),
    check("password", "Please enter a password with at least 5 chars") //different approach
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  loginController.postSignup
);

router.get("/reset", loginController.getReset);
router.post("/reset", loginController.postReset);

router.get("/reset/:token", loginController.getNewPassword);
router.post("/new-password", loginController.postNewPassword);

module.exports = router;
