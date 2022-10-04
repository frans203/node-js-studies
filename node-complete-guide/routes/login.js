const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);
router.post("/logout", loginController.postLogout);

router.get("/signup", loginController.getSignup);
router.post("/signup", loginController.postSignup);

router.get("/reset", loginController.getReset);
router.post("/reset", loginController.postReset);

router.get("/reset/:token", loginController.getNewPassword);
router.post("/new-password", loginController.postNewPassword);

module.exports = router;
