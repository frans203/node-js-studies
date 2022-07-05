const fs = require("fs");

const requestHandler = (req, res) => {
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
      body.push(chunk);
    });
    //returning like that the funcion will be execute async and the next lines wont be executed
    return req.on("end", () => {
      //execute async
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    //we need to put these lines after the req.on(end)
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body><h1>HEADER</h1></body>");
  res.write("</html>");
  return res.end();
};

// module.exports = requestHandler;
// module.exports = {handler:requestHandler}
// module.exports.handler = requestHandler; //exports as a property of routes file
exports.handler = requestHandler; //exports as a property of routes file
