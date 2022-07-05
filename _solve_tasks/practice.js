const http = require("http");
const routes = require("./routes-practice");
const server = http.createServer(routes);

server.listen(3000);
