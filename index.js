const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",    //allowing all server
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Server is running. ');
});

const getRoomId = (id) => {
    return "room:" + id;
}

io.on('connection', (socket) => {
    socket.name = socket.request._query.name
    const createRoom = socket.request._query.createRoom
    console.log("connection request from ", socket.name);
    // socket.emit('me', socket.id);
    if (createRoom) {
        console.log("admin request to create room");
        let completeId = getRoomId(socket.id);
        socket.join(completeId);
        console.log("create room", completeId)
    }
    socket.on('joinRoom', (roomId) => {
        let completeId = getRoomId(roomId);
        console.log("join room, ", completeId);
        socket.join(completeId);
        socket.to(completeId).emit("newUserJoined", { id: socket.id, name: socket.name });
        // socket.to(completeId).emit("newUserJoined", socket.id);
    })
    socket.on('disconnect', () => {
        console.log("disconnecting", socket.name);
        socket.broadcast.emit("userLeft", socket.id);
    });
    socket.on("leaveRoom", (roomId)=>{
        if(!roomId) return;
        let completeId = getRoomId(roomId);
        socket.to(completeId).emit("userLeft", socket.id);
        socket.leave(completeId);
    })
    socket.on("calluser", ({ userToCall, signalData }) => {
        const from = socket.id, name = socket.name;
        console.log("calling user", from, name);
        io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    });

    socket.on("answercall", (data) => {
        console.log("call accepted by receiver: ", socket.name)
        io.to(data.to).emit("callaccepted", { signal: data.signal, name: socket.name, id: socket.id });
    });

    socket.on("sendMessage", data => {
        if(!data)   return;
        const completeId = getRoomId(data.roomId);
        socket.to(completeId).emit("receiveMessage", {message: data.message, from: socket.id, name: socket.name});
    })
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));