import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(302, { Location: `http://localhost:3000${req.url}` });
  res.end();
});

server.listen(3008, () => {
  console.log("Bridge forwarding port 3008 -> http://localhost:3000");
});
