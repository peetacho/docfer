const app = require('./app')
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e9
});

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

server.listen(8080, () => console.log(`Server has started.`));