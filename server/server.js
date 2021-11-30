/**
 * gheto express server for UI serving
 */
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const customParser = require('socket.io-msgpack-parser');
const io = require('socket.io').listen(server, {
    parser: customParser
});

app.use(express.static(`build`));

/**
 * ghetto implementation of tracking player locations
 */
const players = [];

io.on('connection', socket => {
    console.log('Client with socket ID: ' + socket.client.id);
    socket.emit('playerLocations', players); // this may be better as socket so we only tell the client. Not existing players.

    socket.on('playerMoved', (data) => {
        console.log(socket.client.id, 'has moved');
        trackPlayerLocations(data, socket.client.id);
        socket.emit('playerLocations', players);
    });

    socket.on('disconnect', () => {
        console.log('removing', socket.client.id);
        players.splice(
            players.findIndex(player => player.id === socket.client.id),
            1
        );
        socket.emit('playerLocations', players);
    });
});

// // every 5ms we broadcast player locations
// setInterval(() => {
//     io.emit('playerLocations', players);
// }, 5);

const trackPlayerLocations = (state, id) => {
    const playerIndex = players.findIndex(player => player.id === id);
    if (playerIndex >= 0) {
        return players[playerIndex] = { id, ...state };
    }
    return players.push({ id, ...state });
}

server.listen(process.env.PORT || 3001, () => {
    console.log(`server is running on port ${server.address().port}`);
});
