exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[6].split("=")[1] === "true";
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.isLoggedIn,
  });
};
exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
  req.isLoggedIn = true;
  res.redirect("/");
};
