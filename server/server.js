const io = require('socket.io')(8080, {
    cors: {
        origin: ["http://localhost:3000"]
    },
    maxHttpBufferSize: 1e9
})

io.on('connection', socket => {
    socket.on("join-room", room => {
        socket.join(room)
    })

    socket.on("send-message", ({ msg, room, fileData }) => {
        if (room !== "") {
            socket.to(room).emit("receive-message", { msg: msg, sender: socket.id, fileData: fileData })
        }
    })
})