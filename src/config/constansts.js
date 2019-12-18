import player_walk from '../player/person_0.svg';

export const SPRITE_SIZE = 124;
export const MAP_HEIGHT = SPRITE_SIZE * 4;
export const MAP_WIDTH = SPRITE_SIZE * 5;
// time between movement in ms.
export const PLAYER_MOVEMENT_SPEED = 350;

export const PLAYER_SPRITE = player_walk;
 
export const MOVEMENT_KEY_MAP = {
  37: 'WEST', // left arrow key
  38: 'NORTH', // up arrow key
  39: 'EAST', // right arrow key
  40: 'SOUTH' // down arrow key
}
