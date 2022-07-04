const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      "<body><form input='text' action='/message' method='POST'><input type='text' name='message'/><button type='submit'>SEND</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseString = Buffer.concat(body).toString();
      const message = parseString.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    console.log(body);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<h1>HEADER</h1>");

  res.write("</html>");
  return res.end();
});

server.listen(3000);
