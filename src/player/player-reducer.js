import { PLAYER_SPRITE } from '../config/constansts';
import { socket } from '../shared/network/socket';

const initialState = {
  position: [0, 0],
  spriteSheet: PLAYER_SPRITE,
  spriteLocation: '0px 0px',
  direction: 'EAST',
};

const playerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      updatePlayerLocationOnTheServer({
        ...state,
        ...action.payload,
      });
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

const updatePlayerLocationOnTheServer = (state) => {
  socket.emit('playerMoved', state);
}

export {
  playerReducer
}