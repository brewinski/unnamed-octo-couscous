import { PLAYER_SPRITE } from '../config/constansts'; 

const initialState = {
  position: [0, 0],
  spriteSheet: PLAYER_SPRITE,
  spriteLocation: '0px 0px',
  direction: 'EAST',
};

const playerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

export {
  playerReducer
}