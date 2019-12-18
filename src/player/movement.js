import { store } from '../config/store';
import { SPRITE_SIZE, MOVEMENT_KEY_MAP, MAP_WIDTH, MAP_HEIGHT, PLAYER_MOVEMENT_SPEED } from '../config/constansts';
import { interval, timer } from 'rxjs';

// keep the player on the map.
const observeBoundaries = (oldPos, newPos) => {
  return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
         (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE);
}

// only allow the player to stand on tiles that have a value less than 5
const observeImpassable = (oldPos, newPos) => {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];

  return nextTile < 5; 
}

const getNewPosition = (oldPos, direction) => {
  switch (direction) {
    case 'WEST':
      return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
    case 'NORTH':
      return [oldPos[0], oldPos[1] - SPRITE_SIZE];
    case 'EAST':
      return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
    case 'SOUTH':
      return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    default:
      break;
  }
}

const getSpriteLocation = (direction) => {
  switch (direction) {
    case 'WEST':
      return `${SPRITE_SIZE*0}px 0px`
    case 'NORTH':
      return `${SPRITE_SIZE*1}px 0px`
    case 'EAST':
      return `${SPRITE_SIZE*2}px 0px`
    case 'SOUTH':
      return `${SPRITE_SIZE*3}px 0px`
    default:
      break;
  }
}

const directionMove = (newPos, direction) => {
  store.dispatch({
    type: 'MOVE_PLAYER',
    payload: {
      position: newPos,
      direction,
      spriteLocation: getSpriteLocation(direction),
    }
  });
} 

const attemptMove = (direction) => {
  const oldPos = store.getState().player.position;
  const newPos = getNewPosition(oldPos, direction);

  if (observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
    directionMove(newPos, direction);
  }
}

const handleKeyDown = (keyCode) => {
  // will be undefined when an arrow key hasn't been pressed.
  const moveDirection = MOVEMENT_KEY_MAP[keyCode];
  if (moveDirection) {
    return attemptMove(moveDirection);
  }
  return console.log(keyCode);
}

const enoughTimePassedForMovement = (lastMovementTime) => {
  const currentTime = new Date();
  return currentTime.getTime() > lastMovementTime.getTime() + PLAYER_MOVEMENT_SPEED / 1.1
}

const handleMovement = (player) => {
  let currentKey = null;
  let keyUp = null;
  let lastMovementTime = new Date();
  let sub = null;
  const movementInterval = timer(0, 50);

  // add the event listener handling user input
  window.addEventListener('keydown', (e) => {
    currentKey = e.keyCode;
    if(!sub) {
      sub = movementInterval.subscribe(() => {
        if (enoughTimePassedForMovement(lastMovementTime) ) {
          handleKeyDown(currentKey);
          // set the last movement time for comparison
          lastMovementTime = new Date();
        }
        if (currentKey === keyUp) {
          keyUp = null;
          sub.unsubscribe();
          sub = null;
        }
      });
    }
  });

  window.addEventListener('keyup', (e) => {
    keyUp = e.keyCode;
  })

  return player;
}

export default handleMovement;