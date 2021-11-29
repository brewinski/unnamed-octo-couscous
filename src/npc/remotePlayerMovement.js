import { store } from '../config/store';
import { socket } from '../shared/network/socket';

export const handleMovement = (players) => {
    socket.on('playerLocations', (list) => {
        const playerRemoved = list.filter(player => player.id !== socket.id);
        store.dispatch({
            type: 'UPDATE_NPCS',
            payload: {
                npcList: playerRemoved
            }
        });
    });

    return players;
}