const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const users = [];

router.get("/users", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "users.html"));
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
    path: "/users",
  });
});
router.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

module.exports = router;
