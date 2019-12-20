import { SPRITE_SIZE, PLAYER_SPRITE_MAP } from '../config/constansts';

const initialState = {
  npcList: [{
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 5, SPRITE_SIZE * 8],
    spriteSheet: PLAYER_SPRITE_MAP.emmy,
    spriteLocation: '0px 0px',
    direction: 'EAST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.hank,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  },
  {
    position: [SPRITE_SIZE * 8, SPRITE_SIZE * 5],
    spriteSheet: PLAYER_SPRITE_MAP.J,
    spriteLocation: '0px 0px',
    direction: 'WEST',
  }]
};

const npcReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NPCS':
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

export {
  npcReducer,
}