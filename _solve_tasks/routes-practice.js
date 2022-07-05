const fs = require("fs");

const requirePractice = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>GREETINGS<h1>");
    res.write(
      "<form input='text' method='POST' action='/create-user'><input type='text' name='message'/><button type='submit' value='send'>SEND</button><form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>USERS<h1>");
    res.write("<ul><li>ITEM</li><ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const user = parseBody.split("=")[1];
      console.log("user: ", user);
      fs.writeFile("user.txt", user, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body><h1>HEADER</h1></body>");
  res.write("</html>");
  return res.end();
};

module.exports = requirePractice;
