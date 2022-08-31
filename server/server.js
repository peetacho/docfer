const io = require('socket.io')(8080, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', socket => {
    console.log(socket.id + "has connected!")

    socket.on("join-room", room => {
        console.log(socket.id + " has joined the room: " + room)
        socket.join(room)
    })

    socket.on("send-message", ({ msg, room }) => {
        console.log(socket.id + " has sent a message to the room: " + room)
        if (room !== "") {
            socket.to(room).emit("receive-message", { msg: msg, sender: socket.id })
            console.log("everyone else will now receieve a message from " + socket.id + " to the room: " + room)
        }
    })

})