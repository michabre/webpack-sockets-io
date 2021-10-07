const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 9000;

app.use("/dist", express.static("dist"));
app.use("/node_modules", express.static("node_modules"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log(`${socket.id}: ${msg}`);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
