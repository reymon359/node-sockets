const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
// Now we define the server where the app will run
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO is the backend communication  
let io = socketIO(server);

// To know when an user (client) connects to the server
io.on('connection', (client) => {
    console.log('User connected');
    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Wellcome to this app'
    });
    // To know if the client disconnects from the server
    client.on('disconnect', () => {
        console.log('User disconnected');
    });
    client.on('sendMessage', (message) => {
        console.log(message);
    });

});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${ port }`);

});