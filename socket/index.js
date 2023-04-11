const io = require("socket.io")(8001,{
    cors:{
        origin: "http://localhost:8123"
    }
})

io.on("connection", (socket) => {
    console.log("a user connected.")
})