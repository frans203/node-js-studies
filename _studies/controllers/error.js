exports.error = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found", path: false });
};
