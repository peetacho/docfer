const io = require('socket.io')(8080, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on("send-message", (message, room) => {
        if (room !== "") {
            socket.to(room).emit("receive-message", message)
        }
    })
})