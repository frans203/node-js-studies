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
  res.setHeader("Set-Cookie", "loggedIn=true");
  req.isLoggedIn = true;
  res.redirect("/");
};
