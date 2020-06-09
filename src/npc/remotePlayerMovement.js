import { store } from '../config/store';
import { socket } from '../shared/network/socket';

export const handleMovement = (players) => {
    socket.on('playerLocations', (list) => {
        store.dispatch({
            type: 'UPDATE_NPCS',
            payload: {
                npcList: list
            }
        });
    });

    return players;
}