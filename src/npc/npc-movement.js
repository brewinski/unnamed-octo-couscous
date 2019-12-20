import { PLAYER_MOVEMENT_SPEED, SPRITE_SIZE } from '../config/constansts';
import { timer } from 'rxjs';
import { store } from '../config/store';

// TODO: remove duplicate
// keep the player on the map.
const observeBoundaries = (newPos) => {
  const map = store.getState().map.size;
  return (newPos[0] >= 0 && newPos[0] <= map.width - SPRITE_SIZE) &&
         (newPos[1] >= 0 && newPos[1] <= map.height - SPRITE_SIZE);
}

// TODO: remove duplicate
// only allow the player to stand on tiles that have a value less than 5
const observeImpassable = (newPos) => {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];

  return nextTile < 5; 
}

// TODO: remove duplicate
const observeNpcImpassable = (newPosition) => {
  const npcList = store.getState().npcs.npcList;
  const y = newPosition[1] / SPRITE_SIZE;
  const x = newPosition[0] / SPRITE_SIZE;
  
  return !npcList.some(({position}) => {
    const npcY = position[1] / SPRITE_SIZE;
    const npcX = position[0] / SPRITE_SIZE;
    return y === npcY && x === npcX;
  });
}

// TODO: remove duplicate
const getNewPosition = (oldPosition, direction) => {
  switch (direction) {
    case 'WEST':
      return [oldPosition[0] - SPRITE_SIZE, oldPosition[1]];
    case 'NORTH':
      return [oldPosition[0], oldPosition[1] - SPRITE_SIZE];
    case 'EAST':
      return [oldPosition[0] + SPRITE_SIZE, oldPosition[1]];
    case 'SOUTH':
      return [oldPosition[0], oldPosition[1] + SPRITE_SIZE];
    default:
      break;
  }
}

// TODO: remove duplicate
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

// TODO: his is just for the POC
const directionMap = {
  0: 'EAST',
  1: 'WEST',
  2: 'SOUTH',
  3: 'NORTH',
}

const getUpdatedNpc = ({position, direction}) => {
  const newDirection = direction;
  const newPosition = getNewPosition(position, direction);
  const updatedPosition = observeBoundaries(newPosition) && observeImpassable(newPosition) && observeNpcImpassable(newPosition) ?
    newPosition : position;

  const randomDirection = directionMap[Math.floor(Math.random() * 100) % 4];
  
  return {
    position: updatedPosition,
    direction: randomDirection,
    spriteLocation: getSpriteLocation(direction),
  }
}

const handleNpcMovement = (npc) => {
  const timerLoop = timer(0, PLAYER_MOVEMENT_SPEED);
  timerLoop.subscribe(() => {
    const npcList = store.getState().npcs.npcList;
    const newNpcList = [
      ...npcList.map(npc => ({
        ...npc,
        ...getUpdatedNpc(npc)
      }))
    ];

    store.dispatch({
      type: 'UPDATE_NPCS',
      payload: {
        npcList: newNpcList
      }
    });
  });

  return npc;
}

export {
  handleNpcMovement
}