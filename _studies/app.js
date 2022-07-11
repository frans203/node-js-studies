const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const rootDir = require("./util/path");

const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
