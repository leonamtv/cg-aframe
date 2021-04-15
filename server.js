const livereload = require("livereload");
const connect = require("connect");
const compiler = require("connect-compiler");
const static = require("serve-static");

console.log("Start web livereload server...");

const server = connect();
server.use(
  compiler({
    enabled: ["coffee", "uglify"],
    src: "src",
    dest: "public",
  })
);

const port = 8080;

server.use(static(__dirname + "/public"));
server.listen(port);

const lrserver = livereload.createServer();
lrserver.watch(__dirname + "/public");

console.log(`Listening on port ${port}`);
