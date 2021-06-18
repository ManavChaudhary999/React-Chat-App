const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser, removeUser, getUser, getUserRoom} = require("./user");

const PORT = process.env.PORT || 5000;

const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);
// app.get('/', (req,res) => {
//     res.status(200).send('Server is running');
// });

io.on('connection', (socket) => {
    console.log('we have a new connection');

    socket.on('join', {name, room}, (callback)=> {
        const {error, user} = addUser({id: socket.id, name, room}); 
        if (error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`}); // this will send to the specific user
        socket.broadcast.to(user.room).emit('message', ({user: 'admin', text: `${user.name} has joined the chat`}));
        
        socket.join(user.room);
        io.to(user.room).emit('roomdata', ({room: user.room, users: getUserRoom(user.room)}));

        callback();
    });

    socket.on('sendmessage', (message, callback)=> {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', ({user: user.name, text: message}));
        io.to(user.room).emit('roomdata', ({room: user.room, users: getUserRoom(user.room)}));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        io.to(user.room).emit('message', ({user: 'admin', text: `${user.name} has left the chat`}));
    });
});


server.listen(PORT, err => {
    if(!err){
        console.log(`Server running on port ${PORT}`);
    }
});