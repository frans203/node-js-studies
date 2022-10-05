const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const { check, body } = require("express-validator/check");

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);
router.post("/logout", loginController.postLogout);

router.get("/signup", loginController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address is forbidden");
        }
        return true;
      }),
    check("password", "Please enter a password with at least 5 chars").isLength(
      { min: 5 }
    ),
  ],
  loginController.postSignup
);

router.get("/reset", loginController.getReset);
router.post("/reset", loginController.postReset);

router.get("/reset/:token", loginController.getNewPassword);
router.post("/new-password", loginController.postNewPassword);

module.exports = router;
