import EMMY from '../data/players/EMMY-SHEET.png';
import HANK from '../data/players/HANK-2-SHEET.png';
import JESSIE from '../data/players/PATTY-SHEET.png';

export const PLAYER_SPRITE_MAP = {
  emmy: EMMY,
  hank: HANK,
  jessie: JESSIE,
};

export const SPRITE_SIZE = 32;
// time between movement in ms.
export const PLAYER_MOVEMENT_SPEED = 300;

export const PLAYER_SPRITE = PLAYER_SPRITE_MAP.jessie;
 
export const MOVEMENT_KEY_MAP = {
  37: 'WEST', // left arrow key
  38: 'NORTH', // up arrow key
  39: 'EAST', // right arrow key
  40: 'SOUTH' // down arrow key
}
