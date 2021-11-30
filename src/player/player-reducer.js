import { PLAYER_SPRITE, SPRITE_SIZE } from '../config/constansts';
import { socket } from '../shared/network/socket';
import { tiles } from '../data/maps/1';


const setInitialPlayerPosition = () => {
  const initalPosition = tiles.reduce((prev, curr, y) => {
    const x = curr.findIndex((val) => val === 1);

    if (x === -1) {
      return prev;
    }
    return [x * SPRITE_SIZE, y * SPRITE_SIZE];
  },[]);

  return initalPosition;

}

const initialState = {
  position: setInitialPlayerPosition(),
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