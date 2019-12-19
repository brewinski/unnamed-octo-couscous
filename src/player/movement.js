import { store } from '../config/store';
import { SPRITE_SIZE, MOVEMENT_KEY_MAP, PLAYER_MOVEMENT_SPEED } from '../config/constansts';
import { timer } from 'rxjs';

// keep the player on the map.
const observeBoundaries = (newPos) => {
  const map = store.getState().map.size;
  return (newPos[0] >= 0 && newPos[0] <= map.width - SPRITE_SIZE) &&
         (newPos[1] >= 0 && newPos[1] <= map.height - SPRITE_SIZE);
}

// only allow the player to stand on tiles that have a value less than 5
const observeImpassable = (newPos) => {
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
      return `0px ${SPRITE_SIZE*1}px`
    case 'NORTH':
      return `0px ${SPRITE_SIZE*2}px`
    case 'EAST':
      return `0px ${SPRITE_SIZE*3}px`
    case 'SOUTH':
      return `0px ${SPRITE_SIZE*0}px`
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
  const updatedPosition = observeBoundaries(newPos) && observeImpassable(newPos) ?
    newPos : oldPos;
  directionMove(updatedPosition, direction);
}

const handleKeyDown = (keyCode, e) => {
  // will be undefined when an arrow key hasn't been pressed.
  const moveDirection = MOVEMENT_KEY_MAP[keyCode];
  if (moveDirection) {
    e.preventDefault();
    return attemptMove(moveDirection);
  }
  return console.log(keyCode);
}

const enoughTimePassedForMovement = (lastMovementTime) => {
  const currentTime = new Date();
  return currentTime.getTime() > lastMovementTime.getTime() + PLAYER_MOVEMENT_SPEED / 1.1
}

// TODO simplify this so that it's easier to reason about
const handleMovement = (player) => {
  let currentKey = null;
  let keyUp = null;
  let lastMovementTime = new Date();
  let sub = null;
  const movementInterval = timer(0, 50);

  // add the event listener handling user input
  window.addEventListener('keydown', (e) => {
    // TODO we don't want to prevent all keys defualt behavior.
    currentKey = e.keyCode;
    if(!sub) {
      sub = movementInterval.subscribe(() => {
        if (enoughTimePassedForMovement(lastMovementTime) ) {
          handleKeyDown(currentKey, e);
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
  });

  return player;
}

export default handleMovement;