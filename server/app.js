require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "https://freya-777.web.app",
    methods: ["GET", "POST"]
  }
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

io.on("connection", (socket) => {
  console.log('socket connected!');

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
})

app.use(routes)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})