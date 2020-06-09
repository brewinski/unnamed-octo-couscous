/**
 * gheto express server for UI serving
 */
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(`build`));

/**
 * ghetto implementation of tracking player locations
 */
let players = [];

io.on('connection', socket => {
    console.log('Client with socket ID: ' + socket.client.id);
    io.emit('playerLocations', players);

    socket.on('playerMoved', (data) => {
        console.log(socket.client.id, 'has moved');
        trackPlayerLocations(data, socket.client.id);
        io.emit('playerLocations', players);
    });

    socket.on('disconnect', () => {
        console.log('removing', socket.client.id);
        players = players.splice(
            players.findIndex(player => player.id === socket.client.id),
            1
        );
        io.emit('playerLocations', players);
    });
});

const trackPlayerLocations = (state, id) => {
    const playerIndex = players.findIndex(player => player.id === id);
    console.log(playerIndex)
    if (playerIndex >= 0) {
        return players[playerIndex] = { id, ...state };
    }

    return players.push({ id, ...state });
}

server.listen(3001, () => {
    console.log(`server is running on port ${server.address().port}`);
});

// io.listen(3001);
